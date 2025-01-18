import styles from './page.module.css'
import ArticleList from './ArticleList'

const AdminHomePage = () => {
  return (
    <main className={styles.container}>
      <h1>Article Management System</h1>
      <ArticleList />
    </main>
  )
}

export default AdminHomePage