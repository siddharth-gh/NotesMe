import Card from './Card';
import NewCard from './NewCard';
import Greeting from './Greeting';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react';
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';
import { url } from '../assets';

export default function Home(props) {




    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [adding, setAdding] = useState(false);
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    const getNotes = async () => {
        const token = localStorage.getItem('token')
        const notes = await fetch(`${url}/api/notes/getnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
                'auth-token': token
            }
        })
        setNotes(await notes.json());
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

    return (
        <div className={styles.main}>
            <Sidebar notes={notes} setNotes={setNotes} setAdding={setAdding} />
            <main className={theme === 'light' ? styles.light : styles.dark}>
                <Navbar toggleTheme={toggleTheme} theme={theme} />
                <Greeting name={props.name} />
                <div className={styles.container}>
                    {adding && <NewCard setAdding={setAdding} setNotes={setNotes} />}
                    {notes.slice().reverse().map((element) => {
                        return <Card key={element._id} noteId={element._id} description={element.description} theme={element.theme} date={element.updatedAt} setNotes={setNotes} notes={notes} setAdding={setAdding} adding={adding} />
                    })}
                </div>
            </main>
        </div>
    )
}
