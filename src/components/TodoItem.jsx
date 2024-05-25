// TodoItem.js
// import React from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import { useTodoContext } from '../TodoContext';

const TodoItem = ({ todo }) => {
  const { setTodos } = useTodoContext();

  const handleDelete = async () => {
    await axios.delete(`https://ict-exam-backend.onrender.com/api/todos/${todo._id}`);
    setTodos(prev => prev.filter(t => t._id !== todo._id));
  };

  const handleToggle = async () => {
    await axios.patch(`https://ict-exam-backend.onrender.com/api/todos/${todo._id}`, { completed: !todo.completed });
    setTodos(prev => prev.map(t => (t._id === todo._id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.description}
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

// Define PropTypes
TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
