with (import (fetchTarball https://github.com/NixOS/nixpkgs/archive/18.09.tar.gz) { config = {}; });

with haskell.lib;

justStaticExecutables (haskell.packages.ghc822.callPackage ./cardano-installer.nix {})
