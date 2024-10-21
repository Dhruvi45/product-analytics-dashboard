import React, { useState, useEffect } from 'react';
import { getEmailList, markEmailAsRead,getFavoriteEmails,getReadEmails  } from './emailService'; // Your API Service
import { format } from 'date-fns';

interface Email {
  id: string;
  from: {name:string;email:string};
  subject: string;
  short_description: string;
  date: string;
  isRead: boolean;
  isFavorite: boolean;
}

const EmailList = ({ onEmailClick }: { onEmailClick: (id: string,subject:string, date:string, from:string) => void }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filter, setFilter] = useState('All');
  const favoriteEmails = getFavoriteEmails()
  const readEmails =getReadEmails()

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
    if (filter === 'Favorites') return favoriteEmails && favoriteEmails.includes(email.id);
    if (filter === 'Read') return  readEmails && readEmails.includes(email.id);
    if (filter === 'Unread') return readEmails &&!readEmails.includes(email.id);
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
            className={`email-item ${readEmails.includes(email.id) ? 'read' : 'unread'}`}
            onClick={() => {
              markEmailAsRead(email.id); // Mark email as read when clicked
              onEmailClick(email.id, email.subject, email.date, email.from.email)
            }}
          >
            <div className="email-avatar">{email.from.name.charAt(0).toUpperCase()}</div>
            <div className="email-info">
              <p>From: {email.from.email}</p>
              <p>Subject: {email.subject}</p>
              <p>{email.short_description}</p>
              <p>{format(new Date(email.date), 'dd/MM/yyyy hh:mm a')}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
