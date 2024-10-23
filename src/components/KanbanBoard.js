import React, { useState } from "react";
import TicketCard from "./TicketCard";

const KanbanBoard = ({ tickets, users }) => {
  const [groupBy, setGroupBy] = useState('status'); 
  const [sortBy, setSortBy] = useState(null); 

  const priorityOrder = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
      let groupKey = ticket[groupBy];

      if (groupBy === 'userId') {
        groupKey = users.find(user => user.id === ticket.userId)?.name || "Unassigned";
      }
      if (groupBy === 'priority') {
        groupKey = priorityOrder[ticket.priority]; 
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ticket);
      return groups;
    }, {});
  };

  const sortTickets = (tickets, sortBy) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    }
    if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  let groupedTickets = groupTickets(tickets, groupBy);

  groupedTickets = Object.keys(groupedTickets).reduce((sortedGroups, group) => {
    sortedGroups[group] = sortTickets(groupedTickets[group], sortBy);
    return sortedGroups;
  }, {});

  const sortedGroupKeys = Object.keys(groupedTickets).sort((a, b) => {
    if (groupBy === 'userId') return a.localeCompare(b); 
    if (groupBy === 'priority') {
      return priorityOrder.indexOf(a) - priorityOrder.indexOf(b); 
    }
    return 0; 
  });

  const filteredGroupKeys = groupBy === 'priority' 
    ? sortedGroupKeys.filter(group => groupedTickets[group].length > 0)
    : sortedGroupKeys;

  return (
    <div>
      <div className="controls">
        <label htmlFor="groupBy">Display: </label>
        <select id="groupBy" onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>

        <button onClick={() => setSortBy('priority')}>Sort by Priority</button>
        <button onClick={() => setSortBy('title')}>Sort by Title</button>
      </div>

      <div className="kanban-board">
        {filteredGroupKeys.map((group) => (
          <div key={group} className="kanban-column">
            <h2>
              {group} 
              <span> ({groupedTickets[group].length})</span>  
            </h2>
            {groupedTickets[group].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
