import React from 'react'
import styles from './Greeting.module.scss'

function Greeting(props) {

    const name = localStorage.getItem('name')

    return (
        <div className={styles.greeting}>
            Hello,<strong> {name ? (name[0].toUpperCase() + name.slice(1)).split(" ")[0] : ""} !</strong> 👋
            <p>All your notes are here, in one place!</p>
        </div>
    )
}

export default Greeting
