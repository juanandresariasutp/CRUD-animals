const { loadEnvFile } = require('node:process');
loadEnvFile('.env');
const express = require('express');
const router = express.Router();
const pool = require('../db/config');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM animals ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo animales:', error);
    res.status(500).json({ error: 'Error obteniendo animales' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM animals WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo animal:', error);
    res.status(500).json({ error: 'Error obteniendo animal' });
  }
});

router.post('/', async (req, res) => {
  const { name, species, age, habitat, endangered } = req.body;
  
  if (!name || !species) {
    return res.status(400).json({ error: 'Nombre y especie son requeridos' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO animals (name, species, age, habitat, endangered) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, species, age || null, habitat || null, endangered || false]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creando animal:', error);
    res.status(500).json({ error: 'Error creando animal' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, species, age, habitat, endangered } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE animals SET name = COALESCE($1, name), species = COALESCE($2, species), age = COALESCE($3, age), habitat = COALESCE($4, habitat), endangered = COALESCE($5, endangered) WHERE id = $6 RETURNING *',
      [name, species, age, habitat, endangered, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error actualizando animal:', error);
    res.status(500).json({ error: 'Error actualizando animal' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM animals WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    res.json({ message: 'Animal eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando animal:', error);
    res.status(500).json({ error: 'Error eliminando animal' });
  }
});

module.exports = router;
