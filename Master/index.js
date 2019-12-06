const express = require("express");
const path = require("path");
const fs = require("fs");
let notes = require("./db/db.json.js");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

// API routes

app.get("/api/notes", (req, res) => {

    // return fs.readFile("./db/db.json", "utf8", (err, res) => {
    //     if (err) throw err;
    //     let curNotes = JSON.parse(res);
    //     console.log(curNotes);
    //     return curNotes;
    // })
    return res.json(notes);

});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    assignID(newNote);
    reWriteNotes(newNote);
    
})

app.delete("/api/notes/:id", (req, res) => {
   console.log(req.params.id);
    deleteNote(req.params.id);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

function assignID(newNote) {
    let readNotes = notes;
    newNote.id = readNotes.length + 1;
    console.log(newNote);
}

function reWriteNotes(note) {
    let parsedNotes = notes;
    parsedNotes.push(note);
    writeNotes(parsedNotes);
};

function deleteNote(id) {
    let readNotes = notes;
    let filteredNotes = readNotes.filter(note => note.id !== parseInt(id));
    console.log(filteredNotes);
    writeNotes(filteredNotes);

}

function writeNotes(array) {
    fs.writeFile("./db/db.json", JSON.stringify(array), "utf8", (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("Successfully written!");
    });
}