import React from 'react'
import { Icon } from '@iconify/react'
import styles from './Loading.module.scss'

export default function Loading() {
    return (
        <div className={styles.loader}>
            <Icon icon="eos-icons:three-dots-loading" />
        </div>
    )
}
