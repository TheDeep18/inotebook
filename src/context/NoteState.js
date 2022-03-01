import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=> {
    const s1 = {
        "name":"Harry",
        "class":"5B"
    }
    const [state, setstate] = useState(s1)
    const update = ()=>{
        setTimeout(() => {
            setstate({
                "name": "Deep",
                "class": "8A"
            })
        }, 1000);
    }
    return (
    <NoteContext.Provider value={{state, update}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;