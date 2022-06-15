const express = require('express');
const path = require('path');
let db = require('./db/db.json');
const fs = require('fs');
const { restart } = require('nodemon');
var uniqid = require('uniqid'); 


// Landing page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// Notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Route to get saved notes???????
app.get('/api/notes', (req, res) => {
    res.json(db);
})