const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || PORT
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));




















app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));