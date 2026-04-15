const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Libera o CORS totalmente
app.use(cors());
app.use(express.json());

// Rota de teste para você abrir no navegador e ver se o erro some
app.get('/', (req, res) => res.json({ message: 'API ONLINE!' }));

app.use('/api/entries', require('./routes/diaryRoutes'));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Ligar o servidor PRIMEIRO
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Depois tenta conectar ao banco
  mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.error('ERRO DE CONEXÃO NO MONGODB:', err.message));
});