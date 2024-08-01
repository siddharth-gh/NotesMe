import React, { useRef, useState } from 'react'
import styles from './Card.module.scss'
import { Icon } from '@iconify/react'

function Card(props) {

    const { noteId, setNotes, notes } = props
    const [editing, setEditing] = useState(false);

    const handleDelete = async (noteId) => {
        const response = await fetch(`http://localhost:8000/api/notes/deletenote/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            }
        })

        if (response.ok) {
            setNotes(notes => notes.filter(note => note._id !== noteId))
        }
        else {
            console.log("Notes deleting failed")
        }

    }

    const handleEdit = () => {
        setEditing(true);

    }

    const updateNote = async (noteId) => {
        const response = await fetch(`http://localhost:8000/api/notes/updatenote/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                description: value
            })
        })

        // Update the specific note in the local state
        // Creates a new object using the spread operator { ...note }, which copies all properties of the note.
        // Then, it overrides the description property with the new value.
        // This results in a new note object with the updated description.

        setNotes((notes) => {
            return notes.map(note => note._id === noteId ? { ...note, description: value, updatedAt: new Date().toUTCString() } : note)
        })
        setEditing(false);
    }

    const [value, setValue] = useState(props.description);

    const onChange = (event) => {
        setValue(event.target.value)
    }


    return (
        <>
            <div className={styles.card} style={{ backgroundColor: props.theme }}>
                <div className={styles.textarea}>
                    {editing ?
                        <>
                            <textarea rows={8} value={value} onChange={onChange} />
                            <button onClick={() => updateNote(noteId)}>Update</button>
                        </>
                        :
                        <p className={styles.description}>{props.description}
                        </p>
                    }
                </div>
                <p className={styles.date}>{props.date}</p>
                <span >
                    <Icon icon="icon-park-outline:delete-one" onClick={() => handleDelete(noteId)} />
                    <Icon icon="fa-regular:edit" onClick={() => handleEdit(noteId)}></Icon>
                </span>
            </div >
        </>
    )
}

export default Card
