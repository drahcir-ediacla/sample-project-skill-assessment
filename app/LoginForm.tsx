"use client";
import { useState } from "react";
import axiosHandler from "./utils/axiosHandler";
import { useRouter } from "next/navigation";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import Button from "./components/Button";
import Input from "./components/Input";

const LoginForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await axiosHandler.post(
                "/api/auth",
                { username, password }, // Correctly send the data payload
            );
    
            if (response.status === 200) {
                alert("Login successful! Redirecting...");
                router.push('/admin');
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error); // Show error message from the server
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };
    

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
                    <Input
                        value={username}
                        placeholder="Enter username"
                        className={styles.inputField}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.row3}>
                    <b>Password</b>
                    <Input
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        className={styles.inputField}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className={styles.error}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {error}</p>}
                <Button label="Login" onClick={login} />
            </form>
        </main>
    )
}

export default LoginForm