import React, { useRef, useState } from 'react'
import styles from './Card.module.scss'
import { url } from '../assets';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react'
import { formatDate } from '../utils/DateFormatter';
import 'react-toastify/dist/ReactToastify.css';


function NewCard(props) {

    const textAreaRef = useRef(null);

    const noteColors = ['#AEDFE8', '#FDBAA3', '#B6A5CB', '#FBEB95', '#97D2BC']
    // eslint-disable-next-line
    const [theme, setTheme] = useState(noteColors[Math.floor(Math.random() * noteColors.length)])

    // eslint-disable-next-line
    const { notes, setNotes, setAdding, setOriginalNotes } = props;
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const saveNote = async () => {
        const response = await fetch(`${url}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                description: value,
                theme: theme,
                updatedAt: formatDate(new Date())
            })
        })


        const rawData = await response.json();
        const data = rawData.newNote;

        setNotes(notes => [...notes, { description: data.description, theme: data.theme, updatedAt: data.updatedAt, _id: data._id }])
        setOriginalNotes(originalNotes => [...originalNotes, { description: data.description, theme: data.theme, updatedAt: data.updatedAt, _id: data._id }])
        setAdding(false);
        toast.success("Note added successfully");
    }

    const cancelSave = () => {
        setAdding(false);
    }


    return (
        <>
            <div className={styles.card} style={{ backgroundColor: theme }}>
                <div className={styles.textarea}>
                    <textarea rows={9} value={value} onChange={onChange} ref={textAreaRef} className={styles.description} spellCheck={false} placeholder='Start typing...' />
                </div>
                <div className={styles.operations}>
                    <Icon icon="mdi:tick" onClick={saveNote} />
                    <Icon icon="charm:cross" onClick={cancelSave} />
                </div>
                {/* <button onClick={saveNote}>Save</button>
                <button onClick={cancelSave} className={styles.cancel}>Cancel</button> */}
            </div >
        </>
    )
}

export default NewCard
