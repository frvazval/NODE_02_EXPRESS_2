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
    
    if (req.query.any && req.query.any == "desc" && req.query.pais == "asc") {
        let pais = jsonData.sort((a, b) =>  a.pais.localeCompare(b.pais, "es-ES", { numeric: true }));
        return res.json(pais.sort((a, b) => a.anyo - b.anyo));         
    } else if (req.query.any && req.query.any == "desc") {
        return res.json(jsonData.sort((a, b) => b.anyo.localeCompare(a.anyo)));
    }

    res.json(jsonData);
});

// /api/paises  -> de cada pais el total de las ventas de cada uno
// [{"pais": "Argentina", "ventas-totales": 1000}, {"pais": "Chile", "ventas-totales": 2000}]
app.get("/api/paises", (req, res) => {
    const resultado = [];
    const ventaPorPais = {};

    for (let i = 0; i < jsonData.length; i++) {
        const pais = jsonData[i].pais;
        const venta = jsonData[i].venta;

        if (!ventaPorPais[pais]) {
            ventaPorPais[pais] = 0;
        }

        ventaPorPais[pais] += venta;
    }

    console.log(ventaPorPais);

    for (clave in ventaPorPais) {
        resultado.push({
            "pais" : clave,
            "ventas-totales" : ventaPorPais[clave]
        })
    }

    if (resultado.length == 0) {
        return res.json({"respuesta": "No hay datos en este momento"})
    }
    res.json(resultado);

})
// /api/paises/italia -> de un pais concreto el total de las ventas

app.get('/api/paises/:nombrePais', (req, res) => {
    // console.table(req.params);
    // console.log(req.params.nombrePais);
    const nombrePais = req.params.nombrePais.toLowerCase();
    const resultado = [];

    for (objeto of jsonData) {
        let pais = objeto['pais'].toLowerCase();
        if (nombrePais == pais) resultado.push(objeto);        
    }

    if (resultado.length == 0) {
        return res.json({"respuesta": "No hay datos en este momento"})
    }
    res.json(resultado);
})

app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`));