import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=> {

    const notesInitial = [
        {
            "_id": "6218c9f59cb9a3aaeeb48799",
            "user": "62175234dfa041614718ba2b",
            "title": "MyFirst title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-02-25T12:22:13.411Z",
            "__v": 0
        },
        {
            "_id": "6218cd0c9cb9a3aaeeb4879d",
            "user": "62175234dfa041614718ba2b",
            "title": "MyFirst title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-02-25T12:35:24.921Z",
            "__v": 0
        },
        {
            "_id": "6218cd0d9cb9a3aaeeb4879f",
            "user": "62175234dfa041614718ba2b",
            "title": "MyFirst title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-02-25T12:35:25.512Z",
            "__v": 0
        },
        {
            "_id": "6218cd0d9cb9a3aaeeb487a1",
            "user": "62175234dfa041614718ba2b",
            "title": "MyFirst title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-02-25T12:35:25.891Z",
            "__v": 0
        },
        {
            "_id": "6218cd0e9cb9a3aaeeb487a3",
            "user": "62175234dfa041614718ba2b",
            "title": "MyFirst title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-02-25T12:35:26.076Z",
            "__v": 0
        },
        {
            "_id": "6218cd0e9cb9a3aaeeb487a5",
            "user": "62175234dfa041614718ba2b",
            "title": "MyFirst title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2022-02-25T12:35:26.294Z",
            "__v": 0
        },
        {
            "_id": "621c9cb5666f3c51205b76d8",
            "user": "62175234dfa041614718ba2b",
            "title": "New note for update32",
            "description": "This is going to be updated",
            "tag": "YouTube",
            "date": "2022-02-28T09:58:13.421Z",
            "__v": 0
        },
        {
            "_id": "621c9e0a75f5e8f62c14d45e",
            "user": "62175234dfa041614718ba2b",
            "title": "New note for update",
            "description": "This is going to be updated",
            "tag": "personal",
            "date": "2022-02-28T10:03:54.163Z",
            "__v": 0
        },
        {
            "_id": "621c9e0b75f5e8f62c14d460",
            "user": "62175234dfa041614718ba2b",
            "title": "New note for update",
            "description": "This is going to be updated",
            "tag": "personal",
            "date": "2022-02-28T10:03:55.416Z",
            "__v": 0
        },
        {
            "_id": "621c9e83b38fb49a7e0b6a05",
            "user": "62175234dfa041614718ba2b",
            "title": "New note for update2",
            "description": "This is going to be updated",
            "tag": "personal",
            "date": "2022-02-28T10:05:55.347Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)


    return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;