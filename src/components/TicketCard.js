import React from 'react';

const TicketCard = ({ ticket, users }) => {
  const assignedUser = users.find(user => user.id === ticket.userId)?.name || 'Unassigned';

  return (
    <div className="ticket-card">
      <h3>
        {ticket.id}  
      </h3>
      <h3>
        {ticket.title} 
      </h3>
      <p>
        <strong>Priority:</strong> {['No Priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority]}
      </p>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Assigned to:</strong> {assignedUser}
      </p>
      <div className="tags">
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;
