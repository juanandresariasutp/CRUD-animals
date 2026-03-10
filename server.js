const { loadEnvFile } = require('node:process');
const express = require('express');
const animalsRouter = require('./routes/animals');

loadEnvFile('.env');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/animals', animalsRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Animals API',
    endpoints: {
      animals: '/api/animals'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});