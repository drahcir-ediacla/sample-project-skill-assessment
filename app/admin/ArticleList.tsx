'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import useAuthentication from "../hooks/authHook";
import Button from "../components/Button"
import styles from "./page.module.css"
import Link from "next/link"
import axiosHandler from "../utils/axiosHandler"

interface Company {
  id: number;
  logo: string;
  name: string;
  status: "Active" | "Inactive";
}

interface Writer {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  type: "Writer" | "Editor";
  status: "Active" | "Inactive";
};

interface Editor {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  type: "Writer" | "Editor";
  status: "Active" | "Inactive";
};

interface Article {
  id: number;
  image: string;
  title: string;
  link: string;
  status: "Published" | "For Edit";
  writer: Writer;
  editor: Editor;
  company: Company;
};

const ArticleList = () => {
  const { user: authUser } = useAuthentication()
  const [article, setArticle] = useState<Article[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchArticles = async () => {
      try {
        const response = await axiosHandler.get('/api/articles')

        if (response.status === 200) {
          setArticle(response.data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [])

  const addNewArticle = () => {
    router.push('/admin/add-article');
  }

  return (
    <>
      <div className={styles.addButtons}>
        {authUser?.type === 'Writer' &&
          <Button onClick={addNewArticle} label="Add New Article" />
        }
        {authUser?.type === 'Editor' &&
          <>
            <Button onClick={() => console.log('this is button')} label="Add New User" />
            <Button onClick={() => console.log('this is button')} label="Add New Company" />
          </>
        }
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
            {article.map((articleItem) => (
              <tr key={articleItem.id}>
                <td>
                  {authUser?.type === 'Writer' && (
                    <button
                      className={styles.editBtn}
                      disabled={articleItem?.status !== 'For Edit'}
                    >
                      Edit
                    </button>
                  )}
                  {authUser?.type === 'Editor' &&
                    <button className={styles.editBtn}>Edit</button>
                  }
                </td>
                <td><img src={articleItem.image} alt="" /></td>
                <td>{articleItem.title}</td>
                <td><Link href={articleItem.link} target="_blank">View Link</Link></td>
                <td>{articleItem.writer.firstname} {articleItem.writer.lastname}</td>
                <td>{articleItem.editor
                  ? `${articleItem.editor.firstname} ${articleItem.editor.lastname}`
                  : "No editor assigned"}</td>
                <td><span className={`${styles.status} ${articleItem.status === 'Published' ? styles.published : styles.forEdit}`}>{articleItem.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ArticleList