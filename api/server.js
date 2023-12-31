const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const middlewares = jsonServer.defaults()

// const app = jsonServer.create();

// const data = fs.readFileSync(path.resolve(__dirname, '../db.json'), 'utf8');
// fs.writeFileSync('db.json', data);

// const router = jsonServer.router('db.json'); // para windows

const data = fs.readFileSync(path.resolve(__dirname, '../db.json'), 'utf8');
fs.writeFileSync('/tmp/db.json', data);

const router = jsonServer.router('/tmp/db.json'); // para o vercel que funciona como linux com \

const port = process.env.PORT || 3000;

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