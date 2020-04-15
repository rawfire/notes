import { getNotes, createNote, removeNote, updateNote } from './notes.js'
import {getFilters, setFilters} from './filters.js'
import { renderNotes } from './views'

renderNotes()

document.querySelector('#create-btn').addEventListener('click', (event) => {
    const id = createNote()
    location.assign(`edit.html#${id}`)
})

document.querySelector('#note-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes()
    }
})
