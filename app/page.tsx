import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white">
      <header className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold">YourHR</div>
          <div>
            <Link href="/login" className="mr-4 px-4 py-2 bg-transparent border border-white rounded">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded">Signup</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-6xl px-6">
          <h1 className="text-6xl font-semibold mb-6 {roboto.classname}">
            Find Your Dream Job with <span className='text-amber-400'>YourHR</span>
          </h1>
          <p className="text-m mb-8 text-stone-500">
            Connecting you with opportunities tailored to your skills and preferences.
          </p>
          <Link href="/signup" className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg">Get Started</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
