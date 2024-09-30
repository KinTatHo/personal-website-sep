import React, { useState } from "react";

export const MailContent = () => {
  const [unreadCount, setUnreadCount] = useState(2);
  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: "New Project Opportunity",
      from: "recruiter@techco.com",
      read: false,
    },
    {
      id: 2,
      subject: "Meeting Reminder",
      from: "team@startup.com",
      read: false,
    },
  ]);

  const markAsRead = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, read: true } : email
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="text-gray-800">
      <h2 className="text-xl font-bold mb-4">Inbox (Unread: {unreadCount})</h2>
      <div className="space-y-2">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`p-2 ${
              email.read ? "bg-gray-100" : "bg-blue-100"
            } rounded cursor-pointer`}
            onClick={() => markAsRead(email.id)}
          >
            <p className="font-bold">{email.subject}</p>
            <p className="text-sm text-gray-600">From: {email.from}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
