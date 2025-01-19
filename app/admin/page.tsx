'use client'
import { useRouter } from "next/navigation";
import styles from './page.module.css'
import ArticleList from './ArticleList'
import { TbLogout2 } from "react-icons/tb";
import axiosHandler from "../utils/axiosHandler";

const AdminHomePage = () => {
  const router = useRouter()

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