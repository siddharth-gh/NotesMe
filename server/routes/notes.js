const express = require('express');
const router = express.Router();
const notes = require('../models/notes');
const fetchUser = require('../middlewares/fetchuser');


// API to get all the notes
router.get('/getnotes', fetchUser, async (req, res) => {
    res.send(await notes.find({ user: req.user }));
})

//API to add a note
router.post('/addnote', fetchUser, async (req, res) => {
    const note = req.body

    const newNote = await notes.create({
        description: req.body.description,
        theme: req.body.theme,
        user: req.user,
        updatedAt: req.body.updatedAt
    })

    res.status(200).json({
        message: "Note created successfully",
        newNote
    })

})

//API to update a note, auth required
router.put('/updatenote/:id', async (req, res) => {
    const id = req.params.id
    const newData = req.body.description
    const time = req.body.updatedAt
    const updatedNote = await notes.findByIdAndUpdate(id, { description: newData, updatedAt: time }, { new: true })
    res.status(200).json({
        message: "Note updated successfully",
        updatedNote
    })
})

//API to bookmark a note
router.put('/addbookmark/:id', fetchUser, async (req, res) => {
    const id = req.params.id
    const note = await notes.findById(id)
    const bookmarkedNote = await notes.findByIdAndUpdate(id, { bookmark: !note.bookmark }, { new: true })
    const status = bookmarkedNote.bookmark
    res.status(200).json({
        message: status ? "Note bookmarked" : "Bookmark removed",
        bookmarkedNote
    })
})

// //API to bookmark a note
// router.put('/deletebookmark/:id', fetchUser, async (req, res) => {
//     const id = req.params.id
//     const deletedNote = await notes.findByIdAndUpdate(id, { bookmark:  })
//     res.status(200).json({
//         message: "Note bookmarked",
//         deletedNote
//     })
// })


//API to delete a note, auth required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const id = req.params.id
    const deletedNote = await notes.findByIdAndDelete(id)
    res.status(200).json({
        message: "Deleted successfully",
        deletedNote
    })
})



module.exports = router