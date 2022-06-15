const express = require('express');
const path = require('path');
let db = require('./db/db.json');
const fs = require('fs');
const { restart } = require('nodemon');
var uniqid = require('uniqid'); 

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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

// Add written notes to db
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    req.body.id = uniqid();
    db.push(req.body)
    fs.writeFile('./db/db.json',JSON.stringify(db),() => {
        res.json(db);
    });
})

// Delete notes
app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    var updatedDb = db.filter((note) => {
        return note.id !== req.params.id;
    });
    db = updatedDb;
    console.log(updatedDb);
    fs.writeFile('./db/db.json',JSON.stringify(updatedDb),() => {
        res.json(updatedDb);
    });
})

// port
app.listen(3001, () => {
    console.log('server is running');
})