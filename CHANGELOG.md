<!--
<!-- Owner: Jonathan D.A. Jewell <j.d.a.jewell@open.ac.uk> -->
SPDX-License-Identifier: CC-BY-SA-4.0
SPDX-FileCopyrightText: 2026 Jonathan D.A. Jewell (hyperpolymath)
-->
# Changelog

All notable changes to `julia-professional-registry` will be documented in this file.

This file is generated from conventional commits by the
[`changelog-reusable.yml`](https://github.com/hyperpolymath/standards/blob/main/.github/workflows/changelog-reusable.yml)
workflow ([hyperpolymath/standards#206](https://github.com/hyperpolymath/standards/pull/206)). Adopt the workflow in this repo's CI to keep this file in sync automatically — see
[`templates/cliff.toml`](https://github.com/hyperpolymath/standards/blob/main/templates/cliff.toml)
for the canonical config.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Registry: `EchoTypes v0.1.0` (PR #16) and `v0.2.0` (PR #20); `KRLAdapter v0.1.0` (PR #16); `ViperPkg v0.1.0` (PR #18) — total 37 registered packages.
- `CHANGELOG.md`, `ROADMAP.adoc`, `MAINTAINERS.adoc`, `GOVERNANCE.adoc` — bring repo to estate documentation convention (PR #19).
- `.github/ISSUE_TEMPLATE/{bug_report,feature_request,package_registration}.md`, `.github/pull_request_template.md`, `.github/CODEOWNERS`, `.github/FUNDING.yml`, `.github/copilot-instructions.md` — estate-standard contributor onboarding fleet (PR #19).
- `.github/workflows/{scorecard,mirror,secret-scanner,codeql}.yml` — wire the four missing standards reusables (PR #17).
- Wiki: 9 structured pages mirroring repo documentation (Home, Registry-Usage, Packages, Registering-a-Package, Architecture, Testing, Governance, Roadmap, Security) + `_Sidebar` (PR #19).

### Changed

- `.github/workflows/governance.yml` — SHA-pin the standards governance reusable (was floating `@main`) (PR #17).
- `.github/workflows/scorecard.yml` — job-level `security-events: write` + `id-token: write` permissions to match the reusable's canonical caller block; fixes `startup_failure` regression introduced in PR #17 (PR #19).
- Consolidate `CONTRIBUTING.md` and `CONTRIBUTING.adoc` into a single canonical Markdown file (PR #19).

### Removed

- `.machine_readable/STATE.a2ml` (root) — moved to canonical `.machine_readable/6a2/STATE.a2ml` per estate structural-drift policy (PR #17).

### Security

- Dismissed 17 self-referential `hypatia/code_scanning_alerts/CSA00x` alerts as `won't fix`; root cause fixed at SARIF render layer in [hyperpolymath/hypatia#368](https://github.com/hyperpolymath/hypatia/pull/368).
- Closed seven real open code-scanning alerts via the four reusable wrappers, `codeql.yml@language=actions`, and the STATE.a2ml move (PR #17).

## [1.0.0] — 2026-04-04

### Added

- CRG Grade C test suite (see `TEST-NEEDS.md`).
- 34 hyperpolymath Julia packages registered via standard Julia Registry layout (Registry.toml + per-letter directories).
- AsciiDoc top-level documentation: `README.adoc`, `EXPLAINME.adoc`, `TOPOLOGY.md`, three `QUICKSTART-*.adoc` files.
- `.machine_readable/` dual-track scaffolding: `0-AI-MANIFEST.a2ml`, `6a2/{STATE,ECOSYSTEM,META}.a2ml`, contractiles, integrations, anchors.
- `flake.nix`, `guix.scm`, `Justfile` — reproducible development environment.
- Idris2 test harness scaffold (`julia-professional-registry-tests.ipkg`, `tests/`).
- Initial workflow fleet: `boj-build.yml`, `casket-pages.yml`, `governance.yml`, `hypatia-scan.yml`.
