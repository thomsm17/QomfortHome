import { createHash, randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  SubmitContactRequestBody,
  SubmitContactRequestResponse,
  type ApiError,
  type ContactRequestInput,
} from "@workspace/api-zod";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const recentSubmissions = new Map<string, number>();
const submissionCooldownMs = 60_000;
const recipient = "info@qomforthome.nl";
const sender = "QomfortHome website <info@qomforthome.nl>";

const topicLabels: Record<ContactRequestInput["topic"], string> = {
  warmtepomp: "Warmtepomp",
  airco: "Airco",
  hybride: "Hybride systeem",
  thuisbatterij: "Thuisbatterij",
  advies: "Algemeen advies",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function isRateLimited(email: string): boolean {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp >= submissionCooldownMs) recentSubmissions.delete(key);
  }

  const emailKey = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const lastSubmission = recentSubmissions.get(emailKey);
  if (lastSubmission !== undefined && now - lastSubmission < submissionCooldownMs) {
    return true;
  }

  recentSubmissions.set(emailKey, now);
  return false;
}

function errorResponse(error: string): ApiError {
  return { error };
}

router.post("/contact-requests", async (req, res): Promise<void> => {
  const parsed = SubmitContactRequestBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issueCount: parsed.error.issues.length }, "Invalid contact request");
    res.status(400).json(errorResponse("Controleer de ingevulde gegevens en probeer het opnieuw."));
    return;
  }

  const data = parsed.data;
  if (data.website?.trim()) {
    res.status(202).json(
      SubmitContactRequestResponse.parse({
        status: "sent",
        message: "Bedankt, uw aanvraag is ontvangen.",
      }),
    );
    return;
  }

  const name = data.name.trim();
  const message = data.message.trim();
  if (name.length < 2 || message.length < 10) {
    res.status(400).json(errorResponse("Controleer de ingevulde gegevens en probeer het opnieuw."));
    return;
  }

  if (isRateLimited(data.email)) {
    res.status(429).json(
      errorResponse("Er is zojuist al een aanvraag met dit e-mailadres verstuurd. Probeer het over een minuut opnieuw."),
    );
    return;
  }

  const topic = topicLabels[data.topic];
  const phone = data.phone?.trim() || "Niet opgegeven";
  const text = [
    "Nieuwe contactaanvraag via qomforthome.nl",
    "",
    `Naam: ${name}`,
    `E-mailadres: ${data.email}`,
    `Telefoonnummer: ${phone}`,
    `Onderwerp: ${topic}`,
    "",
    "Bericht:",
    message,
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#243b2b;line-height:1.6">
      <h2>Nieuwe contactaanvraag via QomfortHome.nl</h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mailadres:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefoonnummer:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Onderwerp:</strong> ${escapeHtml(topic)}</p>
      <p><strong>Bericht:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const providerResponse = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: data.email,
        subject: `Nieuwe aanvraag via de website — ${topic}`,
        text,
        html,
      }),
    });

    if (!providerResponse.ok) {
      req.log.error(
        { providerStatus: providerResponse.status },
        "Resend rejected a QomfortHome contact request",
      );
      res.status(502).json(
        errorResponse("Versturen is tijdelijk niet gelukt. Bel ons of mail rechtstreeks naar info@qomforthome.nl."),
      );
      return;
    }

    req.log.info({ providerStatus: providerResponse.status }, "QomfortHome contact request email sent");
    res.status(202).json(
      SubmitContactRequestResponse.parse({
        status: "sent",
        message: "Bedankt, uw aanvraag is verstuurd. We nemen zo snel mogelijk contact met u op.",
      }),
    );
  } catch (error) {
    req.log.error({ err: error }, "Unable to send QomfortHome contact request");
    res.status(502).json(
      errorResponse("Versturen is tijdelijk niet gelukt. Bel ons of mail rechtstreeks naar info@qomforthome.nl."),
    );
  }
});

export default router;
