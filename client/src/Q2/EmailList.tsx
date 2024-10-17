import React, { useState, useEffect } from 'react';
import { getEmailList } from './emailService'; // Your API Service

interface Email {
  id: string;
  from: {name:string;email:string};
  subject: string;
  short_description: string;
  date: string;
  isRead: boolean;
  isFavorite: boolean;
}

const EmailList = ({ onEmailClick }: { onEmailClick: (id: string,subject:string, date:string) => void }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchEmails = async () => {
      const data = await getEmailList(); // Fetch the email list
      console.log(data)
      setEmails(data.list);
    };
    fetchEmails();
  }, []);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === 'Favorites') return email.isFavorite;
    if (filter === 'Read') return email.isRead;
    if (filter === 'Unread') return !email.isRead;
    return true;
  });

  return (
    <div className="email-list-container">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('Unread')}>Unread</button>
        <button onClick={() => handleFilterChange('Read')}>Read</button>
        <button onClick={() => handleFilterChange('Favorites')}>Favorites</button>
      </div>
      <ul className="email-list">
        {filteredEmails.map((email) => (
          <li
            key={email.id}
            className={`email-item ${email.isRead ? 'read' : 'unread'}`}
            onClick={() => onEmailClick(email.id, email.subject, email.date)}
          >
            <div className="email-avatar">{email.from.name.charAt(0).toUpperCase()}</div>
            <div className="email-info">
              <p>From: {email.from.email}</p>
              <p>Subject: {email.subject}</p>
              <p>{email.short_description}</p>
              <p>{email.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
