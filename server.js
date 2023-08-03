import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import jsonServer from 'json-server';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const p = __dirname + '/dist/'

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.static(p))
app.use('/db', jsonServer.router('./src/database/Orders.json'))

app.get('/', (req, res) => {
  res.sendFile(p + 'index.html')
})

app.get('*', (req, res) => {
  res.sendFile(p + 'index.html')
})

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
})