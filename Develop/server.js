const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const notes = [
    {
        title: "tester",
        text: "tester",
        id: "tester"
    }
];


//HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/notes", (req, res) => {
    let savedNotesArr = [];
    fs.readFileSync(path.join(__dirname, "db", "db.json"), (err, res) => {
        if (err) throw err;
            console.log(res);
    });
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

// API routes

app.get("/api/notes", (req, res) => {
    getNotes();
    return res.json(notes);
})
    
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
    console.log(newNote);
    appendNote(newNote);
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


function getNotes() {
    fs.readFileSync(path.join(__dirname, "db", "db.json"), (err, res) => {
        if (err) throw err; 
            console.log("Append successful!");
    })
};

function appendNote(note) {
    fs.appendFileSync(path.join(__dirname, "db", "db.json"), '\n' + JSON.stringify(note), (err, res) => {
        if (err) throw err;
        console.log("Appended successfully!");
        return res.json(note);
    })
};