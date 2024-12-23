import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogIn, User } from 'lucide-react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


  interface SignInProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function SignIn({setIsAuthenticated}: SignInProps) {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin",{
        username,
        password,
      });

      const token = response.data.token

      console.log(response.data);      
      setMessage(`User registered successfully: ${response.data.message}`);  

      localStorage.setItem('userData', JSON.stringify({username,password,token}));  
      setMessage(`User registered successfully: ${response.data.message}`);
     
      if(response){
        setIsAuthenticated(true);
        navigate('/Home')
      }else{
        alert('Sign-in failed. Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(`Error: ${error.response?.data?.error || error.message}`);
        console.log(message)
      } else {
        setMessage('An unknown error occurred.');
        console.log(message)
        
      }
    }
    console.log('Sign in with:', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-9 px-4 sm:px-6 lg:px8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <div className="flex items-center">
                <User className="absolute ml-3 text-gray-400" size={20} />
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="flex items-center">
                <Lock className="absolute ml-3 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link to="/signup" className="font-medium text-primary hover:text-opacity-90">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

