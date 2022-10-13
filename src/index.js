const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const fs = require('fs').promises;
const path = require('path');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const pathPalestrantesCadastrados = path.resolve(__dirname, 'talker.json');
  const palestrantesCadastrados = JSON.parse(await fs
    .readFile(pathPalestrantesCadastrados, 'utf-8'));

  if (!palestrantesCadastrados) {
    return [];
  }
  return res.status(HTTP_OK_STATUS).json(palestrantesCadastrados);
});

app.listen(PORT, () => {
  console.log('Online');
});
