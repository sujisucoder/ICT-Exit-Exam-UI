// TodoContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('https://ict-exam-backend.onrender.com/api/todos');
      setTodos(result.data);
    }
    fetchData();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
