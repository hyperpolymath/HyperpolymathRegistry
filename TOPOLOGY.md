<!-- SPDX-License-Identifier: PMPL-1.0-or-later -->
<!-- Copyright (c) 2026 Jonathan D.A. Jewell (hyperpolymath) <j.d.a.jewell@open.ac.uk> -->

# TOPOLOGY.md — HyperpolymathRegistry

## Purpose

Custom Julia package registry aggregating all hyperpolymath Julia packages. Provides unified package index, dependency resolution, and installation for post-disciplinary research, formal verification, and verified computing libraries.

## Module Map

```
HyperpolymathRegistry/
├── Registries.toml            # Registry configuration
├── A/
│   └── ... (packages starting with A)
├── B/
│   └── ... (packages starting with B)
├── ... (alphabetical package directories)
├── README.adoc                # Registry documentation
└── LICENSE                    # PMPL-1.0-or-later
```

## Data Flow

```
[Hyperpolymath Julia Packages] ──► [Registry Index] ──► [Pkg.Registry.add()] ──► [Local Environment]
```

## Key Invariants

- Julia package registry format with standard Registries.toml
- All registered packages use PMPL-1.0-or-later or compatible licenses
- Compatible with standard Julia package manager (Pkg)
- Version resolution follows semantic versioning
