import { initializeEditPage, generateLastEdited } from './views.js'
import { updateNote, removeNote } from './notes.js'


const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeBtn = document.querySelector('#remove-note')
const saveBtn = document.querySelector('#save-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

// setup input event for title and body
// update note object and save notes list 
titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updateAt)
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updateAt)
}) 

// setup a remove button that removes notes and sends them back to the home page
removeBtn.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign(`index.html`)
})

saveBtn.addEventListener('click', (e) => {
    location.assign(`index.html`)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})