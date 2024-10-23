import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Kanban Dashboard</h1>
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
}

export default App;
