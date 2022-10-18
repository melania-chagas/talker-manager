const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const validationTalker = require('../middlewares/validationTalker');

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

router.get('/talker', async (req, res) => {
  const pathPalestrantesCadastrados = path.resolve(__dirname, '../talker.json');
  const palestrantesCadastrados = JSON.parse(await fs
    .readFile(pathPalestrantesCadastrados, 'utf-8'));

  if (!palestrantesCadastrados) {
    return [];
  }
  return res.status(HTTP_OK_STATUS).json(palestrantesCadastrados);
});

router.get('/talker/:id', async (req, res) => {
  const pathPalestrantesCadastrados = path.resolve(__dirname, '../talker.json');
  const palestrantesCadastrados = JSON.parse(await fs
    .readFile(pathPalestrantesCadastrados, 'utf-8'));

  const id = Number(req.params.id);
  const palestrante = palestrantesCadastrados.find((t) => t.id === id);

  if (palestrante) {
    res.status(HTTP_OK_STATUS).json(palestrante);
  } else {
    res.status(NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
});

router.post('/talker', validationTalker, async (req, res) => {
  const talker = req.body;

  const pathPalestrantesCadastrados = path.resolve(__dirname, '../talker.json');
  const palestrantesCadastrados = JSON.parse(await fs
    .readFile(pathPalestrantesCadastrados, 'utf-8'));
  talker.id = palestrantesCadastrados.length + 1;
  palestrantesCadastrados.push(talker);
  await fs.writeFile(pathPalestrantesCadastrados, JSON
    .stringify(palestrantesCadastrados, null, 2), 'utf-8');
  return res.status(201).json(talker);
});

router.put('/talker/:id', validationTalker, async (req, res) => {
  const talker = req.body;

  const pathPalestrantesCadastrados = path.resolve(__dirname, '../talker.json');
  const palestrantesCadastrados = JSON.parse(await fs
    .readFile(pathPalestrantesCadastrados, 'utf-8'));
  const id = Number(req.params.id);
  talker.id = id;
  const palestrante = palestrantesCadastrados.find((t) => t.id === id);
  const index = palestrantesCadastrados.indexOf(palestrante);
  palestrantesCadastrados[index] = talker;

  await fs.writeFile(pathPalestrantesCadastrados, JSON
    .stringify(palestrantesCadastrados, null, 2), 'utf-8');
  return res.status(200).json(talker);
});

module.exports = router;