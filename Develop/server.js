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
        if (err) {console.log("ERROR, could not read file.")
        } else {
            console.log(res);
        }
    });
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

// API routes

app.get("/api/notes", (req, res) => {
    return res.json(notes);
})

// req = {
//  url: , 
//  data: {title: ,text: }, 
//  method:"post"
//  }
    
app.post("/api/notes", (req, res) => {
    let newNote = req.data;
    console.log(req.data);
    newNote.id = req.data.title.replace(/\s+/g, "").toLowerCase();
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


