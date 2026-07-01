; SPDX-License-Identifier: MPL-2.0
;; guix.scm — GNU Guix package definition for JuliaProfessionalRegistry
;; Usage: guix shell -f guix.scm

(use-modules (guix packages)
             (guix build-system gnu)
             (guix licenses))

(package
  (name "JuliaProfessionalRegistry")
  (version "0.1.0")
  (source #f)
  (build-system gnu-build-system)
  (synopsis "JuliaProfessionalRegistry")
  (description "JuliaProfessionalRegistry — part of the hyperpolymath ecosystem.")
  (home-page "https://github.com/hyperpolymath/julia-professional-registry")
  (license ((@@ (guix licenses) license) "MPL-2.0"
             "https://www.mozilla.org/en-US/MPL/2.0/")))
