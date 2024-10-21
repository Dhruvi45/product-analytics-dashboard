import React, { useState } from 'react';
import EmailList from './EmailList';
import EmailBody from './EmailBody';
import Header from "../component/Header"
import './email.css'; // Add necessary CSS styles here

const Mail = () => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [from, setFrom] = useState<string | null>(null)

  const handleEmailClick = (id: string, subject: string, date: string, from:string) => {
    setSelectedEmailId(id);
    setSubject(subject)
    setDate(date)
    setFrom(from)
  };

  return (
    <>
    <Header />
    <div className="app-container">
      <div className={`email-view ${selectedEmailId ? 'split-view' : ''}`}>
        <EmailList onEmailClick={handleEmailClick} />
        {selectedEmailId && <EmailBody emailId={selectedEmailId} subject={subject} emailDate={date} from={from}/>}
      </div>
    </div>
    </>
  );
};

export default Mail;
