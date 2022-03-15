import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';

    const notesInitial = []


    const [notes, setNotes] = useState(notesInitial)

    //Add a note
    const addNote = async (title, description, tag) => {
        //TODO: API call
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNzUyMzRkZmEwNDE2MTQ3MThiYTJiIn0sImlhdCI6MTY0NTY5ODgyNn0.U-DBs66ORvxTMKf5FZM_ZdePyQXtt6oKBuALabnzkro"
            },
            body: JSON.stringify({ title, description, tag })
        });
        // let json = response.json()
        // console.log(json);

        console.log("Adding a new note");
        const note = {
            "_id": "621c9e83b38fb49ase0b6a05",
            "user": "62175234dfa041614718ba2b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-28T10:05:55.347Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }


    //GET ALL NOTES
    const getNotes = async () => {
        //TODO: API call
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNzUyMzRkZmEwNDE2MTQ3MThiYTJiIn0sImlhdCI6MTY0NTY5ODgyNn0.U-DBs66ORvxTMKf5FZM_ZdePyQXtt6oKBuALabnzkro"
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    //Delete a note

    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNzUyMzRkZmEwNDE2MTQ3MThiYTJiIn0sImlhdCI6MTY0NTY5ODgyNn0.U-DBs66ORvxTMKf5FZM_ZdePyQXtt6oKBuALabnzkro"
            }
        })
        // const json = response.json()
        // console.log(json)
        console.log("Deleting a note id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNzUyMzRkZmEwNDE2MTQ3MThiYTJiIn0sImlhdCI6MTY0NTY5ODgyNn0.U-DBs66ORvxTMKf5FZM_ZdePyQXtt6oKBuALabnzkro"
            },
            body: JSON.stringify({ title, description, tag })
        });
        let json = response.json()
        console.log(json)

        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;