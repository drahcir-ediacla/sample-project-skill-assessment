import React from 'react'
import styles from './page.module.css'

const AdminHeader = () => {
  return (
    <header className={styles.headerContainer}>
        <div className='col1'><h2>Admin Panel</h2></div>
        <div className='col2'>Richard - Editor</div>
    </header>
  )
}

export default AdminHeader