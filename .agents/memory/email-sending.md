---
name: Email sending diagnostics
description: Distinguish Resend sender-domain restrictions from API-key failures when testing the contact form.
---

Do not treat a rejected Resend domain-list request as proof that the sending credential is invalid. A send-only key can reject read operations while still sending successfully. Use the sending error to distinguish an unverified sender domain from an invalid key.

**Why:** During contact-form testing, the domain-list request was denied by the key's intentional sending-only restriction, while the actual sending failure was caused by sender-domain verification.

**How to apply:** Keep temporary sender and recipient overrides scoped to development. Resend's test sender is limited to the account's own email address; production sending from the business domain requires domain verification. Never silently substitute the test sender for production.
