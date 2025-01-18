'use client'
import Button from "../components/Button"
import styles from "./page.module.css"
import Link from "next/link"

const ArticleList = () => {
  return (
    <>
      <div className={styles.addButtons}>
        <Button onClick={() => console.log('this is button')} label="Add New Article" />
        <Button onClick={() => console.log('this is button')} label="Add New User" />
        <Button onClick={() => console.log('this is button')} label="Add New Company" />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.articleTable}>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Image</th>
              <th>Title</th>
              <th>Link</th>
              <th>Writer</th>
              <th>Editor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button className={styles.editBtn}>✏️ Edit</button></td>
              <td><img src="https://via.placeholder.com/50" alt="Thumbnail" /></td>
              <td>Sample Article 1</td>
              <td><Link href="#" target="_blank">View Link</Link></td>
              <td>John Doe</td>
              <td>Jane Smith</td>
              <td><span className={`${styles.status} ${styles.published}`}>Published</span></td>
            </tr>
            <tr>
              <td><button className={styles.editBtn}>✏️ Edit</button></td>
              <td><img src="https://via.placeholder.com/50" alt="Thumbnail" /></td>
              <td>Another Great Read</td>
              <td><Link href="#" target="_blank">View Link</Link></td>
              <td>Alice Johnson</td>
              <td>Richard Roe</td>
              <td><span className={`${styles.status} ${styles.draft}`}>Draft</span></td>
            </tr>
            <tr>
              <td><button className={styles.editBtn}>✏️ Edit</button></td>
              <td><img src="https://via.placeholder.com/50" alt="Thumbnail" /></td>
              <td>Breaking News</td>
              <td><Link href="#" target="_blank">View Link</Link></td>
              <td>Michael Brown</td>
              <td>Sarah Green</td>
              <td><span className={`${styles.status} ${styles.archived}`}>For Edit</span></td>
            </tr>

            <tr>
              <td><button className={styles.editBtn}>✏️ Edit</button></td>
              <td><img src="https://via.placeholder.com/50" alt="Thumbnail" /></td>
              <td>Sample Article 1</td>
              <td><Link href="#" target="_blank">View Link</Link></td>
              <td>John Doe</td>
              <td>Jane Smith</td>
              <td><span className={`${styles.status} ${styles.published}`}>Published</span></td>
            </tr>
            <tr>
              <td><button className={styles.editBtn}>✏️ Edit</button></td>
              <td><img src="https://via.placeholder.com/50" alt="Thumbnail" /></td>
              <td>Another Great Read</td>
              <td><Link href="#" target="_blank">View Link</Link></td>
              <td>Alice Johnson</td>
              <td>Richard Roe</td>
              <td><span className={`${styles.status} ${styles.draft}`}>Draft</span></td>
            </tr>
            <tr>
              <td><button className={styles.editBtn}>✏️ Edit</button></td>
              <td><img src="https://via.placeholder.com/50" alt="Thumbnail" /></td>
              <td>Breaking News</td>
              <td><Link href="#" target="_blank">View Link</Link></td>
              <td>Michael Brown</td>
              <td>Sarah Green</td>
              <td><span className={`${styles.status} ${styles.archived}`}>For Edit</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ArticleList