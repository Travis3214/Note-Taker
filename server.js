// Import express and fs //
const express = require('express');
const pass = require('path');
const fs = require('fs');

// Bringing in helper functions for reading/writing/deleting // 
const { readFromFile, readAndAppend, deleteFromFile } = require('./helpers/fsUtils');

// Bringing in file for generating id number //
const uuid = require('./helpers/uuid');

// Define express //
const app = express();

// Define port //
const PORT = process.env.PORT || 3001;

// Creating an array for notes // 
const notesArray = [];

// Set middleware for json/html //
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Creating path to static homepage
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Need a get for the notes // 
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Need a get //
app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Need a post // 


// Create a get for the homepage // 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Port needs a listener //
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));