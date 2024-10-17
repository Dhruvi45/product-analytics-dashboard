import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailBody from './EmailBody';
import './email.css'; // Add necessary CSS styles here

const Mail = () => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const handleEmailClick = (id: string, subject: string, date: string) => {
    setSelectedEmailId(id);
    setSubject(subject)
    setDate(date)
  };

  return (
    <div className="app-container">
      <div className={`email-view ${selectedEmailId ? 'split-view' : ''}`}>
        <EmailList onEmailClick={handleEmailClick} />
        {selectedEmailId && <EmailBody emailId={selectedEmailId} subject={subject} emailDate={date}/>}
      </div>
    </div>
  );
};

export default Mail;
