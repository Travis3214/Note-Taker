// Import express and fs //
const express = require('express');
const path = require('path');

// Bringing in helper functions for reading/writing/deleting // 
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');

// Bringing in file for generating id number //
const uuid = require('./helpers/uuid');

// Define express //
const app = express();

// Define port //
const PORT = process.env.PORT || 3001; 

// Set middleware for json/html //
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Creating path to static homepage
app.use(express.static('public'));

// Need a get for the notes // 
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Need a get //
app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Need a post // 
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if(req.body) {
        const theNote = {
            title,
            text,
            id: uuid(),
        }
    
    readAndAppend(theNote, './db/db.json');
    res.json('Not saved successfully');
    } else {
        res.error('Note did NOT save successfully')
    }
});

// Create a get for the homepage // 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Port needs a listener //
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));