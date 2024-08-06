import React from 'react'
import { Icon } from '@iconify/react'
import styles from './Loading.module.scss'

export default function Loading(props) {

    const { theme } = props
    return (
        <div className={`${theme === 'light' ? styles.laoder : styles.loaderDark}`}>
            <Icon icon="eos-icons:three-dots-loading" />
        </div>
    )
}
