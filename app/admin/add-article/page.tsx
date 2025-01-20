'use client'
import React, { useRef, useState, useEffect } from 'react'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosHandler from '@/app/utils/axiosHandler';
import useAuthentication from '@/app/hooks/authHook';
import Input from '@/app/components/Input'
import Button from '@/app/components/Button';
import DatePicker from '@/app/components/DatePicker';
import styles from "./page.module.css";
import { IoIosArrowDown } from "react-icons/io";

interface Company {
    id: number;
    logo: string;
    name: string;
    status: "Active" | "Inactive";
}

interface Article {
    image: string;
    title: string;
    link: string;
    date: string;
    content: string;
    status: "Published" | "For Edit";
    writer: number | string;
    company: number | string;
};


const AddArticlePage = () => {
    const { user: authUser } = useAuthentication()
    const dropDownSelect = useRef<HTMLDivElement | null>(null);
    const [optionsOpen, setOptionsOpen] = useState(false)
    const [companyData, setCompanyData] = useState<Company[]>([])
    const [selectedCompany, setSelectedCompany] = useState('')
    const [requiredCompany, setRequiredCompany] = useState('')
    const [requiredTitle, setRequiredTitle] = useState('')
    const [requiredLink, setRequiredLink] = useState('')
    const [requiredDate, setRequiredDate] = useState('')
    const [requiredContent, setRequiredContent] = useState('')
    const [isSending, setIsSending] = useState(false);
    const [newArticleInfo, setNewArticleInfo] = useState<Article>(() => {
        return {
            image: '',
            title: '',
            link: '',
            date: new Date().toISOString().split('T')[0],
            content: '',
            status: 'For Edit',
            writer: authUser?.id ?? '',
            company: '',
        };
    });
    console.log('newArticleInfo:', newArticleInfo)

    useEffect(() => {
        if (authUser?.id) {
            // Update the state after authUser is available
            setNewArticleInfo((prevInfo) => ({
                ...prevInfo,
                writer: authUser.id,
            }));
        }
    }, [authUser]); // Re-run when authUser is updated


    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (dropDownSelect.current && !dropDownSelect.current.contains(e.target as Node)) {
                setOptionsOpen(false)
            }
        }
        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, [])

    const handleCompanySelect = (id: number, name: string) => {
        setNewArticleInfo({ ...newArticleInfo, company: id })
        setSelectedCompany(name)
        setOptionsOpen(false)
    }

    useEffect(() => {

        const fetchArticles = async () => {
            try {
                const response = await axiosHandler.get('/api/companies')

                if (response.status === 200) {
                    setCompanyData(response.data)
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }
        fetchArticles();
    }, [])

    const toggleOptionsOpen = () => {
        setOptionsOpen(!optionsOpen)
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const slug = e.target.value
        const BaseUrl = process.env.NEXT_PUBLIC_ARTICLE_PERMALINK_BASE_URL;
        setNewArticleInfo({ ...newArticleInfo, link: `${BaseUrl}${slug}` })
    }

    const validateForm = () => {
        let hasErrors = false;

        if (!newArticleInfo.company) {
            setRequiredCompany('This field is required.');
            hasErrors = true;
        } else {
            setRequiredCompany('');
        }

        if (!newArticleInfo.title) {
            setRequiredTitle('This field is required.');
            hasErrors = true;
        } else {
            setRequiredTitle('');
        }

        if (!newArticleInfo.link) {
            setRequiredLink('This field is required.');
            hasErrors = true;
        } else {
            setRequiredLink('');
        }

        if (!newArticleInfo.date) {
            setRequiredDate('This field is required.');
            hasErrors = true;
        } else {
            setRequiredDate('');
        }

        if (!newArticleInfo.content) {
            setRequiredContent('This field is required.');
            hasErrors = true;
        } else {
            setRequiredContent('');
        }
        return !hasErrors;
    };

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Access the first file (if it exists)
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

        if (!file) {
            alert('No image selected.');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            alert(`File ${file.name} exceeds the maximum size of 2MB and will not be uploaded.`);
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed.');
            return;
        }
    };



    const uploadImgToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('upload_preset', 'auwcvbw0');
        formData.append('cloud_name', 'yogeek-cloudinary');
        formData.append('folder', 'samples');
        formData.append('file', file);

        const CLOUDINARY_API = process.env.NEXT_PUBLIC_CLOUDINARY_API;

        if (!CLOUDINARY_API) {
            throw new Error('CLOUDINARY_API is not defined in environment variables.');
        }

        try {
            const response = await fetch(CLOUDINARY_API, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.secure_url; // Return single uploaded file info
            } else {
                console.error(`Error uploading ${file.name}: ${response.statusText}`);
                return null; // Return null for unsuccessful uploads
            }
        } catch (error) {
            console.error(`Error uploading ${file.name}:`, error);
            return null; // Return null for errors
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        setIsSending(true)

        try {
            // Ensure the file input contains a valid file
            const fileInput = document.querySelector<HTMLInputElement>("#fileInputId");
            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                alert("Please upload a file.");
                setIsSending(false);
                return;
            }

            const file = fileInput.files[0]; // Get the selected file

            // Upload the file to Cloudinary and get its URL
            const fileUrl = await uploadImgToCloudinary(file);

            const requestWithFile = {
                ...newArticleInfo,
                image: fileUrl, // Save the uploaded file URL
            };

            const response = await axiosHandler.post('/api/articles', requestWithFile);
            console.log('Request sent successfully:', response.data);
            alert('Added new article successfully!');

            // Reset the form
            setNewArticleInfo({
                image: '',
                title: '',
                link: '',
                date: new Date().toISOString().split('T')[0],
                content: '',
                status: 'For Edit',
                writer: authUser?.id ?? '',
                company: '',
            });
            setSelectedCompany('')
            setIsSending(false)
            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error sending request:', error);
            alert('Unable to send your request. Please try again.');
        } finally {
            setIsSending(false)
        }
    };




    return (
        <div className={styles.formContainer}>
            <h1>Add New Article</h1>
            <form className={styles.form}>
                <div className={styles.formRow1}>
                    <b>Company</b>
                    {requiredCompany && <span style={{ color: 'red', fontSize: '13px' }}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {requiredCompany}</span>}
                    <div className={styles.selectCompany} ref={dropDownSelect}>
                        <div
                            className={`${styles.dropDownArrow} ${optionsOpen ? 'active' : ''}`}
                            onClick={!isSending ? toggleOptionsOpen : undefined}
                        >
                            <IoIosArrowDown />
                        </div>
                        <div className={styles.selectedOptions}>
                            <input type="text" id='selectedCompanyID' className={styles.selectedCompanyStyle} value={selectedCompany} placeholder='Please select one...' readOnly />
                        </div>
                        {optionsOpen &&
                            <div className={styles.options}>
                                {companyData.map((option) => (
                                    <div
                                        key={option.id}
                                        className={styles.option}
                                        onClick={() => handleCompanySelect(option.id, option.name)}
                                    >
                                        {option.name}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.formRow2}>
                    <b>Upload Image</b>
                    <input
                        type='file'
                        id='fileInputId'
                        onChange={handleImgChange}
                        accept=".png,.jpg,.jpeg"
                    />
                </div>
                <div className={styles.formRow3}>
                    <label htmlFor="inputTitleID"><b>Title</b></label>
                    {requiredTitle && <span style={{ color: 'red', fontSize: '13px' }}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {requiredTitle}</span>}
                    <Input
                        id='inputTitleID'
                        name='nameTitle'
                        placeholder='Enter article title'
                        value={newArticleInfo.title}
                        onChange={(e) => setNewArticleInfo({ ...newArticleInfo, title: e.target.value })}
                    />
                </div>
                <div className={styles.formRow4}>
                    <label htmlFor="inputLinkID"><b>Permalink:</b> <span>{process.env.NEXT_PUBLIC_ARTICLE_PERMALINK_BASE_URL}</span></label>
                    {requiredLink && <span style={{ color: 'red', fontSize: '13px' }}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {requiredLink}</span>}
                    <Input
                        id='inputLinkID'
                        name='nameLink'
                        className={styles.linkInput}
                        placeholder='Enter slug'
                        onChange={handleSlugChange}
                    />
                </div>
                <div className={styles.formRow5}>
                    <label htmlFor='articleDateID'><b>Date</b></label>
                    {requiredDate && <span style={{ color: 'red', fontSize: '13px' }}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {requiredDate}</span>}
                    <DatePicker
                        id="articleDateID"
                        name="nameArticleDate"
                        value={newArticleInfo.date}
                        className={styles.articleDate}
                        onChange={(e) => setNewArticleInfo({ ...newArticleInfo, date: e.target.value })}
                    />
                </div>
                <div className={styles.formRow6}>
                    <label htmlFor='textContentID'><b>Content</b></label>
                    {requiredContent && <span style={{ color: 'red', fontSize: '13px' }}><FontAwesomeIcon icon={faInfoCircle} color='red' /> {requiredContent}</span>}
                    <textarea
                        id='textContentID'
                        name='nameContent'
                        value={newArticleInfo.content}
                        onChange={(e) => setNewArticleInfo({ ...newArticleInfo, content: e.target.value })}
                        rows={10}
                    />
                </div>
                <Button label='Save' onClick={handleSubmit} />
            </form>

        </div>

    )
}

export default AddArticlePage