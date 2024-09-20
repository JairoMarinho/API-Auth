const express = require('express');
const path = require('path');
const connectDB = require('./config');
const authRoutes = require('./auth');
const postRoutes = require('./posts');

const app = express();

// Corrige o caminho para o 'app.js' se necessário
const appMiddlewarePath = path.resolve(__dirname, 'middleware', 'token.js');
console.log(appMiddlewarePath)
// Tente requerer o arquivo, mas primeiro verifique se ele existe
try {
  const appMiddleware = require(appMiddlewarePath);
} catch (err) {
  console.error(`Erro ao carregar o middleware app.js no caminho ${appMiddlewarePath}:`, err.message);
}

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
