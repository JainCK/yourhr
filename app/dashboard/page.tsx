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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name ?? 'Guest'}</h1>
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Your Info</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Experience:</strong> {user.experience} years</p>
        <p><strong>Job Category:</strong> {user.jobCategory}</p>
        <p><strong>Expected LPA:</strong> {user.expectedLPA}</p>
        <p><strong>Resume:</strong> <a href={user.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Job Postings</h2>
        <ul>
          {jobs.map(job => (
            <li key={job.id} className="mb-4">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
