const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - Apenas uma vez cada!
app.use(cors()); 
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => res.json({ message: 'API do app Compras funcionando.' }));

// Suas rotas
app.use('/api/entries', require('./routes/diaryRoutes'));

// Conexão com o Banco
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pet_diary';

mongoose.connect(MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  });