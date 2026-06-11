<!--
SPDX-License-Identifier: MPL-2.0
Copyright (c) Jonathan D.A. Jewell <j.d.a.jewell@open.ac.uk>
-->
---
name: Package registration request
about: Propose a new package, or a new version of an existing package, for registration
title: 'register: <Package> v<X.Y.Z>'
labels: registration
assignees: ''
---

**Package**
 - Name:
 - Version being registered:
 - Upstream repository URL:
 - Maintainer (GitHub handle):

**New registration or update?**
 - [ ] Brand-new package (not previously in this registry)
 - [ ] New version of an already-registered package

**Quality bar checklist** (see [GOVERNANCE.adoc](../../GOVERNANCE.adoc))

- [ ] SPDX license headers on all source files
- [ ] REUSE-compliant `LICENSES/` directory
- [ ] OpenSSF Scorecard >= 7 (link the scorecard run if available)
- [ ] No banned-language files in the package
- [ ] `Project.toml` carries semver-compatible `compat` ranges for all dependencies
- [ ] A tag exists on the upstream repo matching the version being registered

**Dependencies on other hyperpolymath registry packages?**
List any deps already in this registry that this package or version requires.

**Additional context**
Anything else the BDFL should know before reviewing the registration.
