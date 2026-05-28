; SPDX-License-Identifier: MPL-2.0
;; guix.scm — GNU Guix package definition for HyperpolymathRegistry
;; Usage: guix shell -f guix.scm

(use-modules (guix packages)
             (guix build-system gnu)
             (guix licenses))

(package
  (name "HyperpolymathRegistry")
  (version "0.1.0")
  (source #f)
  (build-system gnu-build-system)
  (synopsis "HyperpolymathRegistry")
  (description "HyperpolymathRegistry — part of the hyperpolymath ecosystem.")
  (home-page "https://github.com/hyperpolymath/HyperpolymathRegistry")
  (license ((@@ (guix licenses) license) "MPL-2.0"
             "https://www.mozilla.org/en-US/MPL/2.0/")))
