import Card from './Card';
import NewCard from './NewCard';
import Greeting from './Greeting';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react';
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';
import { url } from '../assets';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home(props) {




    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [adding, setAdding] = useState(false);
    const [theme, setTheme] = useState('light');
    const [originalNotes, setOriginalNotes] = useState(notes)
    const [search, setSearch] = useState("")


    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    const getNotes = async () => {
        const notesData = await fetch(`${url}/api/notes/getnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': localStorage.getItem('token')
            }
        })
        const notes = await notesData.json();
        setNotes(notes);
        setOriginalNotes(notes)
    }



    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])


    const handleSearch = (event) => {
        setSearch(event.target.value)
        if (event.target.value === "") {
            setNotes(originalNotes);
        }
        else {
            setNotes((notes) => notes.filter(note => note.description.toLowerCase().includes(event.target.value.toLowerCase())));
        }
    }

    const clearSearch = () => {
        setSearch("")
        setNotes(originalNotes);

    }

    const allNotes = () => {
        setNotes(originalNotes)
    }

    const pinnedNotes = () => {
        setNotes(((notes) => notes.filter(note => note.bookmark === true)))
    }

    return (
        <div className={styles.main}>
            <Sidebar notes={notes} setNotes={setNotes} setAdding={setAdding} allNotes={allNotes} pinnedNotes={pinnedNotes} />
            <main className={theme === 'light' ? styles.light : styles.dark}>
                <Navbar toggleTheme={toggleTheme} theme={theme} handleSearch={handleSearch} search={search} clearSearch={clearSearch} />
                <Greeting name={props.name} />
                <ToastContainer stacked position="bottom-right" transition={Zoom} autoClose={1500} theme={theme} />
                <div className={styles.container}>
                    {adding && <NewCard setAdding={setAdding} setNotes={setNotes} />}
                    {notes.length > 0 || adding ? notes.slice().reverse().map((element) => {
                        return <Card key={element._id} noteId={element._id} description={element.description} theme={element.theme} date={element.updatedAt} bookmark={element.bookmark} setNotes={setNotes} notes={notes} setAdding={setAdding} adding={adding} />
                    }) : <p>No notes to display</p>}
                </div>
            </main>
        </div>
    )
}
