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

