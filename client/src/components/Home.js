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

    // const getNotes = async () => {
    //     const notes = await fetch(`${url}/api/notes/getnotes`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',  // Specify the content type
    //             'auth-token': localStorage.getItem('token')
    //         }
    //     })
    //     setNotes(await notes.json());
    // }



    //Better GETNOTES Call with proper error handling
    const getNotes = async () => {
        try {
            const response = await fetch(`${url}/api/notes/getnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                // Log the response for debugging
                const errorText = await response.text();
                console.error('Error response:', errorText);

                // Throw an error with the status text
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }

            const notes = await response.json();
            setNotes(notes);
        } catch (error) {
            console.error('Failed to fetch notes:', error.message);

            // Optionally, set an error state to show a message to the user
            setError('Failed to fetch notes. Please try again later.');
        }
    };






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
