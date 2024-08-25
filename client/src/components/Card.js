import React, { useRef, useState } from 'react'
import styles from './Card.module.scss'
import { Icon } from '@iconify/react'
import { url } from '../assets'
import { toast } from 'react-toastify';
import { formatDate } from '../utils/DateFormatter';
import 'react-toastify/dist/ReactToastify.css';

function Card(props) {

    const { bookmark } = props
    const editingText = useRef(null)

    // eslint-disable-next-line
    const { noteId, setNotes, setOriginalNotes } = props
    const [editing, setEditing] = useState(false);

    const handleDelete = async (noteId) => {
        const response = await fetch(`${url}/api/notes/deletenote/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            }
        })

        if (response.ok) {
            setNotes(notes => notes.filter(note => note._id !== noteId))
            setOriginalNotes(originalNotes => originalNotes.filter(note => note._id !== noteId))
            toast.success("Note deleted successfully")
        }
        else {
            toast.error("Failed to delete note")
        }

    }

    const handleEdit = () => {
        setEditing(true);
    }

    const updateNote = async (noteId) => {
        const response = await fetch(`${url}/api/notes/updatenote/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                description: value,
                updatedAt: formatDate(new Date())
            })
        })


        if (response.ok) {
            // Update the specific note in the local state
            // Creates a new object using the spread operator { ...note }, which copies all properties of the note.
            // Then, it overrides the description property with the new value.
            // This results in a new note object with the updated description.

            const rawData = await response.json();
            const data = rawData.updatedNote;

            setNotes((notes) => {
                return notes.map(note => note._id === noteId ? { ...note, description: value, updatedAt: data.updatedAt } : note)
            })
            setOriginalNotes((originalNotes) => {
                return originalNotes.map(note => note._id === noteId ? { ...note, description: value, updatedAt: data.updatedAt } : note)
            })
            toast.success("Note updated successfully")
        }
        else {
            toast.error("Failed to update note")
        }
        setEditing(false);
    }


    //Method to add bookmark to a note
    const addBookmark = async (noteId) => {
        const response = await fetch(`${url}/api/notes/addbookmark/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            }
        })


        if (response.ok) {
            // Update the specific note in the local state
            // Creates a new object using the spread operator { ...note }, which copies all properties of the note.
            // Then, it overrides the description property with the new value.
            // This results in a new note object with the updated description.
            setNotes((notes) => {
                return notes.map(note => note._id === noteId ? { ...note, bookmark: !bookmark } : note)
            })
            setOriginalNotes((originalNotes) => {
                return originalNotes.map(note => note._id === noteId ? { ...note, bookmark: !bookmark } : note)
            })
            if (bookmark) {
                toast.success("Bookmark removed");
            }
            else {
                toast.success("Bookmark added")
            }
        }
        else {
            toast.error("Failed to add bookmark")
        }
    }

    const [value, setValue] = useState(props.description);

    const onChange = (event) => {
        setValue(event.target.value)
    }

    console.log(localStorage.getItem('theme'))


    return (
        <>
            <div className={`${styles.card} ${localStorage.getItem('theme') === 'light' ? styles.light : styles.dark}`} style={{ backgroundColor: props.theme }}>
                <span className={styles.bookmark} onClick={() => addBookmark(noteId)}>
                    {props.bookmark ?
                        <Icon icon="oi:bookmark" className={props.bookmark ? styles.remove_bookmark : styles.remove_bookmark_unactive} />
                        :
                        <Icon icon="fontisto:bookmark" className={props.bookmark ? styles.add_bookmark : styles.add_bookmark_unactive} />
                    }
                </span>
                <div className={styles.textarea}>
                    {editing ?
                        <>
                            <textarea rows={8} value={value} onChange={onChange} spellCheck={false} ref={editingText} />
                        </>
                        :
                        <>
                            <pre className={styles.description}>
                                {props.description}
                            </pre>
                        </>
                    }
                </div>
                <p className={styles.date}>{props.date}</p>
                <span className={styles.deleteUpdate}>
                    <Icon icon="icon-park-outline:delete-one" onClick={() => handleDelete(noteId)} />
                    {/* {editing ?
                        <Icon icon="mdi:tick" onClick={() => updateNote(noteId)} />
                        :
                        <Icon icon="fa-regular:edit" onClick={() => handleEdit(noteId)}></Icon>
                    } */}
                    {editing ?
                        <Icon icon="mdi:tick" onClick={() => updateNote(noteId)} />
                        :
                        <Icon icon="fa-regular:edit" onClick={() => handleEdit(noteId)} />
                    }
                </span>
            </div >
        </>
    )
}

export default Card
