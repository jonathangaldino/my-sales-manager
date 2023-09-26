"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import reqInstance from "../helpers/axios";
import { updateToken } from "./storage";

type ServiceResponse<D> = { data: D, error: null } | { data: null, error: Error } 

const sendAuthRequest = async ({ email, password, action } : { email: string, password: string, action: 'login' | 'register' }): Promise<ServiceResponse<{ token: string }>> => {
  let url = `/auth`

  if (action === 'login') {
    url += '/login'
  }

  try {
    const { data } = await reqInstance.post<{ token: string }>(url, {
      email,
      password
    })

    return {
      data,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: new Error(`Failed to ${action}`)
    }
  }
}


export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [action, setAction] = useState<'register' | 'login'>('login');
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    
    const { data, error } = await sendAuthRequest({ email, password, action });

    if (error) {
      setError(error.message);
      return;
    }

    updateToken(data.token);
    router.push('/dashboard');
    return;


  }

  const changeAction = () => {
    setAction(action === 'login' ? 'register' : 'login')
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            My Sales Manager   
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                { action === 'login' ? 'Sign in to your account' : 'Sign up a new account'}
                </h1>
                <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{action === 'login' ? 'Sign in' : 'Sign up'}</button>
                </form>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <button type="button" onClick={changeAction} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{ action === 'login' ? 'Sign Up' : 'Sign In'}</button>
                </p>

                { error && (
                  <p>
                    {error}
                  </p>
                )}
            </div>
        </div>
    </div>
    </section>
  )
}
