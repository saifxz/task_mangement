import { useEffect, useState } from 'react';
import axios from '../axios'; // assuming axios instance is set
import './Tasks.css'; // 👈 import the CSS

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  async function fetchTasks() {
    const res = await axios.get('/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTasks(res.data);
  }

  async function addTask(e) {
    e.preventDefault();
    await axios.post('/tasks', { title }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTitle('');
    fetchTasks();
  }

  async function updateTask(task) {
    await axios.put(`/tasks/${task._id}`, { completed: !task.completed }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchTasks();
  }

  async function deleteTask(id) {
    await axios.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <h2>My Tasks</h2>

      <form onSubmit={addTask} aria-label="Add Task Form" className="task-form">
        <input
          aria-label="Task Title"
          value={title}
          placeholder="Enter new task..."
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span
              aria-label={task.title}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.title}
            </span>
            <div className="task-actions">
              <button onClick={() => updateTask(task)} aria-label="Toggle Complete">
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task._id)} aria-label="Delete Task" className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
