{ pkgs ? import <nixpkgs> {} }:

let
  mongodb-data-dir = "./data/db";
  mongodb-port = 27017;

  # Create a script to manage MongoDB lifecycle ✨
  mongodb-runner = pkgs.writeScriptBin "mongodb-runner" ''
    #!${pkgs.stdenv.shell}

    MONGODB_PID=""

    start_mongodb() {
      echo "🌸 Starting MongoDB-chan! uwu"
      mkdir -p ${mongodb-data-dir}
      ${pkgs.mongodb}/bin/mongod --dbpath ${mongodb-data-dir} --port ${toString mongodb-port} &
      MONGODB_PID=$!
      echo "✨ MongoDB-chan is running with PID: $MONGODB_PID"
    }

    stop_mongodb() {
      if [ ! -z "$MONGODB_PID" ]; then
        echo "💖 Giving MongoDB-chan a gentle headpat before stopping..."
        kill $MONGODB_PID
        wait $MONGODB_PID
        echo "🎀 MongoDB-chan is taking a rest now!"
      fi
    }

    # Set up trap for clean shutdown
    trap stop_mongodb EXIT

    # Start MongoDB
    start_mongodb

    # Keep the shell running
    echo "🌟 Your development environment is ready! Press Ctrl+C to exit uwu"
    while true; do
      sleep 1
    done
  '';

in pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_18
    mongodb
    mongodb-runner # Our custom script
    docker
    docker-compose
  ];

  shellHook = ''
    echo "🌸 Welcome to Kawaii Report Service Development Environment! uwu 🌸"

    export PATH="$PWD/node_modules/.bin:$PATH"
    export MONGODB_URI="mongodb://localhost:${toString mongodb-port}/kawaii_reports"
    export PORT=3000

    # Create convenient aliases
    alias start-dev="npm run dev"
    alias test="npm test"
    alias build-docker="docker build -t kawaii-report-service ."

    echo "✨ Available commands:"
    echo "  mongodb-runner  - Start MongoDB server in the background"
    echo "  start-dev      - Start development server"
    echo "  test          - Run tests"
    echo "  build-docker  - Build Docker image"

    # Auto-start MongoDB (uncomment if you want it to start automatically)
    # mongodb-runner &
  '';
}
