const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const middlewares = jsonServer.defaults()

const app = jsonServer.create();

const users = `{  "users": [
    {
      "email": "anita.borg@systers.xyz",
      "password": "$2a$10$gVkmcWdnwEBxXj2PWjuv9uDx7BfjiAobbabDAOrH2o8b1i3E7KwR.",
      "role": "admin",
      "id": 1
    },
    {
      "email": "grace.hopper@systers.xyz",
      "password": "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
      "role": "admin",
      "id": 2
    }
  ]
}`;

fs.writeFileSync('/tmp/db.json', users);
const router = jsonServer.router('/tmp/db.json');

const port = process.env.PORT || 8080;

const rules = auth.rewriter(JSON.parse(fs.readFileSync(path.join(__dirname, '../routes.json'))));

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the auth middleware before the router
app.use(middlewares);
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port, () => {
    console.log(`JSON Server is running in ${port}`);
});