'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.css'
import ArticleList from './ArticleList'
import { TbLogout2 } from "react-icons/tb";
import axiosHandler from "../utils/axiosHandler";
import { cookies } from 'next/headers'; // For accessing cookies in server components

const AdminHomePage = () => {
  const router = useRouter()

  // useEffect(() => {
  //   const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

  //   if (!token) {
  //     router.push('/'); // Redirect to login if not authenticated
  //   }
  // }, [router]);

  // const cookieStore = cookies();
  // const token = await cookieStore.get('auth_token'); // Access the cookie by its name

  // if (!token) {
  //   // If token doesn't exist, render an error or redirect
  //   return <p>You must be logged in to access the admin page.</p>;
  // }


  const logout = async () => {
    try {
      const response = await axiosHandler.get('/api/auth/logout')
      if (response.status === 200) {
        router.push('/');
      } else {
        console.error('Logout failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.logoutBtnContainer}><button className={styles.logoutBtn} onClick={logout}><TbLogout2 className={styles.logoutIcon} /> Logout</button></div>
      <h1>Article Management System</h1>
      <ArticleList />
    </main>
  )
}

export default AdminHomePage