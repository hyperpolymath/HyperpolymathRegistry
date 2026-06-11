-- SPDX-License-Identifier: MPL-2.0
-- Copyright (c) 2026 Jonathan D.A. Jewell (hyperpolymath) <j.d.a.jewell@open.ac.uk>

module Main

import Test.Spec
import ValidateTest
import System

%default covering

main : IO ()
main = do
  (p, f) <- runTestSuite "ValidateTest" ValidateTest.allSuites
  putStrLn ""
  putStrLn $ "=== Total: " ++ show p ++ " passed, " ++ show f ++ " failed ==="
  if f > 0
    then exitWith (ExitFailure 1)
    else pure ()
