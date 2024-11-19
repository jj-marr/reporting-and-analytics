{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_18
    mongodb
    docker
    docker-compose
  ];

  shellHook = ''
    echo "🌸 Welcome to Kawaii Report Service Development Environment! uwu 🌸"

    export PATH="$PWD/node_modules/.bin:$PATH"
    export MONGODB_URI="mongodb://localhost:27017/kawaii_reports"
    export PORT=3000
  '';
}

