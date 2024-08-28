"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    jobCategory: '',
    expectedLPA: '',
    resume: null as File | null,
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitFormData = new FormData();
    submitFormData.append("name", formData.name);
    submitFormData.append("email", formData.email);
    submitFormData.append("phone", formData.phone);
    submitFormData.append("experience", formData.experience);
    submitFormData.append("jobCategory", formData.jobCategory);
    submitFormData.append("expectedLPA", formData.expectedLPA);
    if (formData.resume) {
      submitFormData.append("resume", formData.resume);
    }
    submitFormData.append("password", formData.password);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: submitFormData,
      });

      if (response.ok) {
        // Redirect to the dashboard page after successful signup
        router.push("/dashboard");
      } else {
        // Handle error response
        console.error("Signup failed", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
  <h1 className="text-3xl font-bold mt-10 mb-1 text-white">Create Your Account</h1>
  <p className="text-white mb-5">
    Already registered?{' '}
    <Link href="/login" className="text-blue-400 hover:text-blue-300">
      Log in here
    </Link>
  </p>
  <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mb-10" onSubmit={handleSubmit}>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Name</label>
      <input
        type="text"
        name="name"
        placeholder='John Doe'
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Email</label>
      <input
        type="email"
        name="email"
        placeholder='johndoe@email.com'
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Phone</label>
      <input
        type="text"
        name="phone"
        placeholder='1234567890'
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Experience (years)</label>
      <input
        type="number"
        name="experience"
        placeholder='0'
        value={formData.experience}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Job Category</label>
      <select
        name="jobCategory"
        value={formData.jobCategory}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>Select a category</option>
        <option value="Software">Software</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        {/* Add more categories as needed */}
      </select>
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Expected LPA</label>
      <input
        type="number"
        name="expectedLPA"
        placeholder='550000'
        value={formData.expectedLPA}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Resume (PDF)</label>
      <input
        type="file"
        name="resume"
        onChange={handleFileChange}
        accept="application/pdf"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="mb-5">
      <label className="block mb-2 text-gray-700 font-normal">Password</label>
      <input
        type="password"
        name="password"
        placeholder='********'
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300">
      Sign Up
    </button>
  </form>
</div>

  );
};

export default Signup;