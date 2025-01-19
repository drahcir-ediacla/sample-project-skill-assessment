'use client'
import Link from 'next/link'
import useAuthentication from '../hooks/authHook'
import styles from './page.module.css'

const AdminHeader = () => {
  const {user: authUser} = useAuthentication()

  return (
    <header className={styles.headerContainer}>
      <div className='col1'><h2><Link href='/admin'>Admin Panel</Link></h2></div>
      <div className='col2'>{authUser?.firstname} - {authUser?.type}</div>
    </header>
  )
}

export default AdminHeader