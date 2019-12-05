const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const notes = [];


//HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

// API routes

app.get("/api/notes", (req, res) => {
    return res.json(notes);
})

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = req.title.replace(/\s+/g, "").toLowerCase();
    notes.push(newNote);
    res.json(newNote);
})

app.delete("api/notes/:id", (req, res) => {
    let curNote = req.id;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === curNote) {
            delete notes[i];
            return console.log("Note successfully deleted!");
            
        } else {
            console.log("Cannot delete, no such note exsists.");
        }
    }
})

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });


// function getNotes() {
//     fs.readFileSync("./Develop/db/db.json");
// }

