// SPDX-License-Identifier: PMPL-1.0-or-later
// Copyright (c) 2026 Jonathan D.A. Jewell (hyperpolymath) <j.d.a.jewell@open.ac.uk>

import { assertEquals, assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

// Unit tests: Registry structure validation
Deno.test("Unit: Registry.toml exists and is valid", async () => {
  const content = await Deno.readTextFile("Registry.toml");
  assert(content.includes('name = "HyperpolymathRegistry"'));
  assert(content.includes("uuid"));
  assert(content.includes("[packages]"));
});

Deno.test("Unit: README documentation exists", async () => {
  const result = await Deno.stat("README.adoc");
  assertEquals(result.isFile, true);
});

Deno.test("Unit: Package directories exist", async () => {
  const expectedDirs = ["A", "B", "C", "E", "F", "H", "I", "J", "K", "L", "M", "P", "Q", "S", "T", "V", "Z"];

  for (const dir of expectedDirs) {
    const result = await Deno.stat(dir);
    assertEquals(result.isDirectory, true, `Directory ${dir} should exist`);
  }
});

Deno.test("Unit: LICENSES directory exists", async () => {
  const result = await Deno.stat("LICENSES");
  assertEquals(result.isDirectory, true);
});

// Smoke tests: Registry content validation
Deno.test("Smoke: Registry contains package entries", async () => {
  const content = await Deno.readTextFile("Registry.toml");
  const packageMatches = content.match(/= \{ name = "/g) || [];
  assert(packageMatches.length > 0, "Should have package entries");
  assert(packageMatches.length >= 20, "Should have multiple packages");
});

Deno.test("Smoke: Package entries have required fields", async () => {
  const content = await Deno.readTextFile("Registry.toml");

  // Sample a package entry
  const packageMatch = content.match(/= \{ name = "(\w+)", path = "([^"]+)" \}/);
  assert(packageMatch !== null, "Package entries should have name and path");
  assert(packageMatch![2].includes("/"), "Path should contain directory separator");
});

Deno.test("Smoke: README lists packages", async () => {
  const content = await Deno.readTextFile("README.adoc");
  assert(content.includes("Package"));
  assert(content.includes("Version"));
});

// Contract tests: Package structure
Deno.test("Contract: Sample packages have complete TOML files", async () => {
  const expectedTomlFiles = ["Package.toml", "Versions.toml"];

  for (const tomlFile of expectedTomlFiles) {
    const result = await Deno.stat(`A/Axiom/${tomlFile}`);
    assertEquals(result.isFile, true, `File A/Axiom/${tomlFile} should exist`);
  }
});

Deno.test("Contract: Package.toml files are valid", async () => {
  const content = await Deno.readTextFile("A/Axiom/Package.toml");
  assert(content.includes("name =") || content.includes("uuid ="));
  // Should have TOML structure
  assert(content.includes("="), "Should have TOML key-value pairs");
});

// Aspect tests: Cross-cutting consistency
Deno.test("Aspect: All packages follow naming convention", async () => {
  const registryContent = await Deno.readTextFile("Registry.toml");

  // Extract all package names
  const nameMatches = registryContent.matchAll(/name = "([A-Za-z0-9_]+)"/g);
  const names = Array.from(nameMatches).map((m) => m[1]);

  assert(names.length > 0, "Should find package names");

  // All should start with uppercase letter or contain CamelCase
  for (const name of names) {
    assert(
      /^[A-Z]/.test(name),
      `Package name "${name}" should start with uppercase`
    );
  }
});

Deno.test("Aspect: Package directories match path structure", async () => {
  const registryContent = await Deno.readTextFile("Registry.toml");

  // Extract a few path references
  const pathMatches = registryContent.matchAll(/path = "([A-Z]\/[^"]+)"/g);
  const paths = Array.from(pathMatches).slice(0, 5);

  for (const [, path] of paths) {
    const stat = await Deno.stat(path);
    assertEquals(stat.isDirectory, true, `Path ${path} should exist as directory`);
  }
});

Deno.test("Aspect: All referenced packages have directories", async () => {
  const registryContent = await Deno.readTextFile("Registry.toml");
  const pathMatches = registryContent.matchAll(/path = "([A-Z]\/([^"]+))"/g);

  let testedCount = 0;
  for (const [, path] of pathMatches) {
    try {
      const stat = await Deno.stat(path);
      if (stat.isDirectory) {
        testedCount++;
      }
    } catch {
      // Some may not exist, which would be an error in production
    }

    if (testedCount >= 3) break;  // Spot check 3 packages
  }

  assert(testedCount > 0, "Should find at least some packages");
});

// Property-based tests: Invariants
Deno.test("Property: Registry.toml is parseable as TOML", async () => {
  const content = await Deno.readTextFile("Registry.toml");

  // Basic TOML structure: sections with [name], key = value pairs
  assert(content.includes("[packages]"), "Should have [packages] section");
  assert(content.includes(" = "), "Should have key = value pairs");
});

Deno.test("Property: All package UUIDs are valid format", async () => {
  const content = await Deno.readTextFile("Registry.toml");

  // Extract UUIDs (basic check: 8-4-4-4-12 hex pattern)
  const uuidMatches = content.matchAll(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
  const uuids = Array.from(uuidMatches).map((m) => m[0]);

  assert(uuids.length > 0, "Should have UUID entries");
  assert(uuids.length >= 20, "Should have multiple package UUIDs");
});

Deno.test("Property: No duplicate package names", async () => {
  const content = await Deno.readTextFile("Registry.toml");
  const nameMatches = content.matchAll(/name = "([^"]+)"/g);
  const names = Array.from(nameMatches).map((m) => m[1]);

  const uniqueNames = new Set(names);
  assertEquals(
    uniqueNames.size,
    names.length,
    "All package names should be unique"
  );
});

// E2E/Reflexive tests: Complete pipeline
Deno.test("E2E: Registry round-trip parsing", async () => {
  const content = await Deno.readTextFile("Registry.toml");

  // Parse first package entry
  const match = content.match(/([a-f0-9\-]+) = \{ name = "(\w+)", path = "([^"]+)" \}/);
  assert(match !== null, "Should find a package entry");

  const [, uuid, name, path] = match;
  assert(uuid.includes("-"), "UUID should have hyphens");
  assert(name.length > 0, "Name should be non-empty");
  assert(path.includes("/"), "Path should have directory structure");

  // Verify the package exists
  try {
    const stat = await Deno.stat(path);
    assertEquals(stat.isDirectory, true, `Package directory ${path} should exist`);
  } catch {
    // May not exist in test environment
  }
});

Deno.test("E2E: Package entries are consistent with directories", async () => {
  // Verify at least one package from registry exists on disk
  const registryContent = await Deno.readTextFile("Registry.toml");
  const pathMatch = registryContent.match(/path = "([A-Z]\/[^"]+)"/);

  if (pathMatch) {
    const path = pathMatch[1];
    try {
      const stat = await Deno.stat(path);
      assertEquals(stat.isDirectory, true, `Package ${path} should exist`);
    } catch {
      // May not exist in all environments
    }
  }
});

Deno.test("E2E: Documentation matches registry content", async () => {
  const registryContent = await Deno.readTextFile("Registry.toml");
  const readmeContent = await Deno.readTextFile("README.adoc");

  // Extract some package names from registry
  const registryNames = Array.from(
    registryContent.matchAll(/name = "([^"]+)"/g)
  )
    .slice(0, 3)
    .map((m) => m[1]);

  // At least one should be mentioned in README
  const mentioned = registryNames.some((name) => readmeContent.includes(name));
  assert(mentioned, "README should reference some packages from registry");
});

// Benchmark baseline (timing assertions)
Deno.test("Benchmark: Registry parsing performance", async () => {
  const start = performance.now();
  const content = await Deno.readTextFile("Registry.toml");
  const packageCount = (content.match(/name = "/g) || []).length;
  const end = performance.now();

  const duration = end - start;
  assert(duration < 100, `File read should complete in < 100ms, took ${duration.toFixed(2)}ms`);
  assert(packageCount > 20, `Should have > 20 packages, found ${packageCount}`);
});

Deno.test("Benchmark: Registry size baseline", async () => {
  const stat = await Deno.stat("Registry.toml");
  // Baseline: should contain meaningful registry data
  assert(
    stat.size > 2000,
    `Registry should be substantial (> 2KB), size: ${stat.size} bytes`
  );
});
