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

// ... (parte de cima do código com express e cors)

const MONGO_URI = process.env.MONGO_URI;

// Ligar o servidor INDEPENDENTE do banco de dados
const PORT = process.env.PORT || 10000; // Render usa 10000 por padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Tenta conectar, mas não trava o servidor se falhar
  if (!MONGO_URI) {
    console.error("ERRO: Variável MONGO_URI não encontrada no Environment!");
  } else {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('Conectado ao MongoDB com sucesso!'))
      .catch(err => console.error('ERRO DE CONEXÃO NO MONGODB:', err.message));
  }
});