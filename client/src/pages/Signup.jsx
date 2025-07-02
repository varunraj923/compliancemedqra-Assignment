import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", { email, password });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold">Signup</h2>
      <input className="border p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Signup</button>
    </form>
  );
}