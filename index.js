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
    // console.log(req.query);
    console.table(req.query); 
    
    if (req.query.any && req.query.any == "desc" && req.query.pais == "asc") {
        let anyo = jsonData.sort((a, b) => b.anyo - a.anyo);
        return res.json(anyo.sort((a, b) => a.pais - b.pais));
    } else if (req.query.any && req.query.any == "desc") {
        return res.json(jsonData.sort((a, b) => b.anyo - a.anyo));
    }    

    res.json(jsonData);
});

app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`));