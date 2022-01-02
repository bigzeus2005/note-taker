const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  req.body.id = uuidv4();
  notes.push(req.body);
  const newNote = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', newNote);
  res.json(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf-8');
  const notes = JSON.parse(data);

  const newNote = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', newNote);
});









app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));