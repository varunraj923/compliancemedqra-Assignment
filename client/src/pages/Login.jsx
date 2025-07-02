import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    localStorage.setItem('token', res.data.token);
    navigate('/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}