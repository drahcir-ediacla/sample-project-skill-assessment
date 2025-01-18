"use client";
import styles from "./page.module.css";
import Button from "./components/Button";

const LoginForm = () => {

    const login = () => {
        console.log('Button was clicked')
    }

    return (
        <main className={styles.loginFormContainer}>
        <form className={styles.loginForm}>
            <div className={styles.row1}>
                <div className={styles.row1}>
                    <h1>Admin Login</h1>
                    Use a valid username and password to gain access.
                </div>
            </div>
            <div className={styles.row2}>
                <b>Username</b>
                <input className={styles.inputField} placeholder="Enter username"></input>
            </div>
            <div className={styles.row3}>
                <b>Password</b>
                <input className={styles.inputField} placeholder="Enter password"></input>
            </div>
            <Button label="Login" onClick={login} />
        </form>
        </main>
    )
}

export default LoginForm