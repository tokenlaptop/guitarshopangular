const express = require('express');
const router = express.Router();

let guitars = [
  { id: '1', brand: 'Fender', model: 'Stratocaster', year: 1954, price: 1500 },
  { id: '2', brand: 'Gibson', model: 'Les Paul', year: 1952, price: 2200 }
];

// READ: Fetch all
router.get('/api/guitars', (req, res) => {
  res.json(guitars);
});

// CREATE: Add guitar
router.post('/api/guitars', (req, res) => {
  const newGuitar = {
    id: Date.now().toString(),
    brand: req.body.brand,
    model: req.body.model,
    year: Number(req.body.year),
    price: Number(req.body.price)
  };
  guitars.push(newGuitar);
  res.status(201).json(newGuitar);
});

// UPDATE: Modify guitar
router.put('/api/guitars/:id', (req, res) => {
  const { id } = req.params;
  const index = guitars.findIndex(g => g.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Guitar not found' });
  }

  guitars[index] = { ...guitars[index], ...req.body };
  res.json(guitars[index]);
});

// DELETE: Remove guitar
router.delete('/api/guitars/:id', (req, res) => {
  const { id } = req.params;
  guitars = guitars.filter(g => g.id !== id);
  res.status(204).send();
});

module.exports = router;