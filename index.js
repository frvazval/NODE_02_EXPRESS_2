const path = require('node:path');
const express = require('express');

const app = express();

process.loadEnvFile();
const PORT = process.env.PORT || 8888;

const jsonData  = require('./ventas.json');
// console.log(jsonData);

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));

// /api se tiene que mostrar en la pantalla del navegador el contenido del json
app.get('/api', (req, res) => {
    console.log(req.query);    
    res.json(jsonData);
});

app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`));