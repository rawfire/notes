import moment from 'moment'
import { getFilters } from './filters.js'
import { sortNotes, getNotes } from './notes.js' 

// generate the DOM structure for the note
const generateNoteDOM = (note) => {
    const noteList = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
// setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Note'
    }
    textEl.classList.add('list-item__title')
    noteList.appendChild(textEl)

    // setup the link
    noteList.setAttribute('href', `edit.html#${note.id}`)
    noteList.classList.add('list-item')

    // statusEl message
    statusEl.textContent = generateLastEdited(note.updateAt)
    statusEl.classList.add('list-item__subtitle')
    noteList.appendChild(statusEl)
    return noteList
}

// Render application notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteList = generateNoteDOM(note)
            notesEl.appendChild(noteList)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Add a new Note...'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)
    
    if (!note) {
        location.assign('index.html')
    }
    
    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updateAt)
}
 
// Generate the last edited message
const generateLastEdited = (timeStamp) => `Last edited ${moment(timeStamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }