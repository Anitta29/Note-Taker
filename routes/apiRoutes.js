const router = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json")
router.get("/notes", function (req, res) {
    fs.readFile("db/db.json", "utf-8", (error, data) => {
        if (error) throw error
        res.json(JSON.parse(data))
    })
})

router.post("/notes", function (req, res) {
    fs.readFile("db/db.json", (error, data) => {
        if (error) throw error
        let json = JSON.parse(data)
        
        let newNote =
        {
            id: json.length + 1,
            title: req.body.title,
            text: req.body.text,
        }
        console.log(newNote)
        json.push(newNote)
        fs.writeFile("db/db.json", JSON.stringify(json), (error, data) => {
            if (error) throw error
            res.end(data)
        })
    })
})

// here goes delete buttom
router.delete("/notes/:id", function(req, res) {
    const id = req.params.id
    const newNotes = [];
    fs.readFile("db/db.json", (error, data) => {
        if (error) throw error
        let json = JSON.parse(data)
        
        for (var i = 0; i < json.length; i++){
            let noteId = json[i].id
            if(id != noteId){
                newNotes.push(json[i]);
            }
        }
        fs.writeFile("db/db.json", JSON.stringify(newNotes), (error, data) => {
            if (error) throw error
            res.end(data)
        })
        
    })
    
})














module.exports = router;
