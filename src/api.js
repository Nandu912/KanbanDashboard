export const fetchTickets = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    const data = await response.json();
  
    const usersMap = data.users.reduce((map, user) => {
      map[user.id] = user.name;
      return map;
    }, {});
  
    const ticketsWithUserNames = data.tickets.map(ticket => ({
      ...ticket,
      assigned_to: usersMap[ticket.userId] || 'Unassigned',
    }));
  
    return ticketsWithUserNames;
  };
  