<!--
SPDX-License-Identifier: CC-BY-SA-4.0
Copyright (c) Jonathan D.A. Jewell <j.d.a.jewell@open.ac.uk>
-->
---
name: Bug report
about: Report a problem with the registry or a registered package's metadata
title: ''
labels: bug
assignees: ''
---

**What went wrong?**
A clear, concise description of what the bug is.

**To reproduce**
Steps to reproduce the behaviour. For registry-installation issues, include the exact `Pkg` commands you ran:

```julia
using Pkg
Pkg.Registry.add(...)
Pkg.add("...")
```

**Expected behaviour**
What you expected to happen.

**Actual behaviour**
What actually happened. Paste the Julia error output verbatim if there was one.

**Environment**
 - Julia version (`versioninfo()` output):
 - OS:
 - Registry version / commit:

**Affected package (if applicable)**
 - Package name:
 - Version:
 - Upstream repository:

**Additional context**
Anything else that might help diagnose the problem.
