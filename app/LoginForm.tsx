"use client";
import { useState } from "react";
import axiosHandler from "./utils/axiosHandler";
import axios from "axios";
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
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState("");


    const validateForm = () => {
        let hasErrors = false;

        if (!username) {
            setEmailError('Username is required');
            hasErrors = true;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            hasErrors = true;
        } else {
            setPasswordError('');
        }

        return !hasErrors;
    };

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axiosHandler.post(
                "/api/auth",
                { username, password }, // Correctly send the data payload
            );

            if (response.status === 200) {
                alert("Login successful! Redirecting...");
                router.push('/admin');
            }

        } catch (error) {
            console.error('Error sending request:', error);
            // Safely access 'error.response.data.message'
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.message || "An unknown error occurred.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };
//Testing Changes

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
                    <label htmlFor="inputUsernameID"><b>Username</b></label>
                    {emailError && <p className={styles.error}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {emailError}</p>}
                    <Input
                        id="inputUsernameID"
                        name="nameUsername"
                        value={username}
                        placeholder="Enter username"
                        className={styles.inputField}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.row3}>
                    <label htmlFor="inputPasswordID"><b>Password</b></label>
                    {passwordError && <p className={styles.error}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {passwordError}</p>}
                    <Input
                        id="inputPasswordID"
                        name="namePassword"
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
