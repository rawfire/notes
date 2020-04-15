import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

let notes = []

// read existing notes from localStorage
const loadNotes = () => {
    const notesJson = localStorage.getItem('notes')

    try {
        return notesJson ? JSON.parse(notesJson) : []
    } catch (error) {
        return []
    }
}

// Save the notes to the localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createAt: timeStamp, 
        updateAt: timeStamp
    })
    saveNotes()

    return id
}

// removes a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}
 
// sort your notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updateAt > b.updateAt) {
                return -1
            } else if (a.updateAt < b.updateAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createAt > b.createAt) {
                return -1
            } else if (a.createAt < b.createAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            let nameA = a.title.toUpperCase()
            let nameB = b.title.toUpperCase()
            if (nameA <nameB) {
                return -1
            } else if (nameA > nameB) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    
    if (!note) {
        return 
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updateAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updateAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }