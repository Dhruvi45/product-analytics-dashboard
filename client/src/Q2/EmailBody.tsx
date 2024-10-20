import React, { useEffect, useState } from 'react';
import { getEmailBody } from './emailService'; // Your API Service
import { format } from 'date-fns';

const EmailBody = ({ emailId, subject, emailDate }: { emailId: string, subject: string | null, emailDate: string | null }) => {
    const [emailBody, setEmailBody] = useState({
        subject: subject,
        body: '',
        date: emailDate,
        isFavorite: false,
    });

    useEffect(() => {
        const fetchEmailBody = async () => {
            const data = await getEmailBody(emailId); // Fetch the email body
            setEmailBody((prevState) => ({
                ...prevState,
                body: data.body
            }));
        };
        fetchEmailBody();
    }, [emailId]);

    const handleFavoriteClick = () => {
        setEmailBody((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
        // Add logic to persist favorite state in local storage or backend.
    };

    return (
        <div className="email-body-container">
            <h2>{emailBody.subject}</h2>
            <p>{ emailBody.date && format(new Date(emailBody.date), 'dd/MM/yyyy hh:mm a')}</p>
            <button
                className={`favorite-button ${emailBody.isFavorite ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
            >
                {emailBody.isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
            </button>
            <p>{emailBody.body}</p>
        </div>
    );
};

export default EmailBody;
