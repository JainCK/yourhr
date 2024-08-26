import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to YourHR</h1>
      <p className="text-lg mb-6">Find your ideal job role based on your qualifications and preferences.</p>
      <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
