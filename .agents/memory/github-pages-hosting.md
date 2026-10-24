---
name: GitHub Pages publishing source
description: External Pages settings can cause competing deployments despite a successful website build.
---

QomfortHome's GitHub Pages publishing source must be GitHub Actions, not deployment from the repository root.

**Why:** A successful custom build was followed by a separate branch-based Pages deployment. Publishing the unbuilt repository can overwrite the built site and leave the public URL returning 404 despite a successful custom workflow.

**How to apply:** When diagnosing Pages, compare the latest public deployment with the custom workflow rather than treating one successful workflow as proof that its files remain live. Check the repository's external Pages source setting.
