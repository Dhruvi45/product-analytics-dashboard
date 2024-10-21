import React, { useEffect, useState } from 'react';
import { getEmailBody,getFavoriteEmails, toggleFavoriteEmail } from './emailService'; // Your API Service
import { format } from 'date-fns';
import { Row, Col} from "react-bootstrap";

const EmailBody = ({ emailId, subject, emailDate, from }: { emailId: string, subject: string | null, emailDate: string | null , from: string | null }) => {
    const [emailBody, setEmailBody] = useState({
        from:from,
        subject: subject,
        body: '',
        date: emailDate,
        isFavorite: false,
    });

    useEffect(() => {
        const fetchEmailBody = async () => {
            const data = await getEmailBody(emailId); // Fetch the email body
            const isFavorite = getFavoriteEmails().includes(emailId);

            setEmailBody((prevState) => ({
                ...prevState,
                body: data.body,
                isFavorite
            }));
        };
        fetchEmailBody();
    }, [emailId]);

    const handleFavoriteClick = () => {
        toggleFavoriteEmail(emailId); // Toggle favorite state in localStorage
        setEmailBody((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
      };
    return (
        <div className="email-body-container">
            <Row>
                <Col xs lg={1}>
            <div className="email-avatar">{emailBody.from?.charAt(0).toUpperCase()}</div>
                </Col>
                <Col>
            <h2>{emailBody.subject}</h2>
            <p className="mb-0">{emailBody.from}</p>
            <p>{ emailBody.date && format(new Date(emailBody.date), 'dd/MM/yyyy hh:mm a')}</p>
                </Col>
                </Row>
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
