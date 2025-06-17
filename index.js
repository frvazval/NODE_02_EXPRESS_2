const path = require('node:path');
const express = require('express');

const app = express();
process.loadEnvFile();
const port = process.env.PORT || 8888;

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))