
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/');
    axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setTasks(res.data));
  }, []);

  const addTask = async () => {
    const res = await axios.post("http://localhost:5000/api/tasks", newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks([...tasks, res.data]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Task Manager</h2>
        <button className="text-red-500" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <input className="border p-2" placeholder="Title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <input className="border p-2" placeholder="Description" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <input className="border p-2" type="date" onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <select className="border p-2" onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <button className="bg-blue-600 text-white p-2 rounded" onClick={addTask}>Add Task</button>
      </div>

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
            </div>
            <span className={`px-2 py-1 text-sm rounded ${t.status === 'Done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{t.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}