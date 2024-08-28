"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface User {
  name: string;
  email: string;
  phone: string;
  experience: number;
  jobCategory: string;
  expectedLPA: number;
  resume: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Developer', location: 'Remote', salary: '10 LPA' },
    { id: 2, title: 'UI/UX Designer', location: 'Bangalore', salary: '8 LPA' },
    // Add more hardcoded jobs here
  ]);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };
  
    fetchUserData();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 p-6">
    <h1 className="text-3xl font-bold text-white mb-10">Welcome, {user?.name ?? 'Guest'}</h1>
  
    <div className="w-full max-w-5xl bg-slate-300 p-8 rounded-lg shadow-lg mb-10">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Your Information</h2>
      <div className="grid grid-cols-2 gap-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Experience:</strong> {user.experience} years</p>
        <p><strong>Job Category:</strong> {user.jobCategory}</p>
        <p><strong>Expected LPA:</strong> {user.expectedLPA}</p>
  {/* todo : add resume view feature here */}
        <p><strong>Resume:</strong> <a href={user.resume} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Resume</a></p>
      </div>
    </div>
  
    <div className="w-full max-w-5xl bg-slate-300 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Available Jobs</h2>
      <ul className="space-y-4">
        {jobs.map(job => (
          <li key={job.id} className="border-b pb-4">
            <h3 className="text-lg font-bold text-gray-700">{job.title}</h3>
            <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
            <div className="flex justify-end">
      <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
        Apply now
      </button>
    </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default Dashboard;
