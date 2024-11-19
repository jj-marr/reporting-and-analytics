This is the reporting and analytics module for CPS714.

To get this working locally, run `nix-shell shell.nix`. This will create an ephemeral shell with
everything you need to run MongoDB. After starting MongoDB in that shell, create another shell
using `nix-shell shell.nix`. Then, run `node seedData.js` to fill the MongoDB with test data. Finally,
run `nix-shell server.js` to start the API server.

You can access the API documentation at `http://localhost:3000/api-docs/`
