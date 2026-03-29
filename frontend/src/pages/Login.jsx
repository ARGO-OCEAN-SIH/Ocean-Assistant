import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div class='justify-center items-center flex  bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-4'>
      <Navbar />
          <section class='rounded-md bg-white w-120'>
          <div class='flex items-center justify-center my-3'>
          <div class='xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md'>
            <div class='mb-2 text-center text-black font-bold text-2xl'>
              <h1>Welcome to Ocean Assistant</h1>
            </div>

            <form class='mt-5'>
              <div class='space-y-4'>
                <div>
                  <label class='text-base font-medium text-gray-900'>
                    User Name
                  </label>
                  <div class='mt-2'>
                    <input
                      placeholder='Full Name'
                      type='text'
                      class='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      name='user_name'
                    />
                  </div>
                </div>
                <div>
                
                  <div class='mt-2'>
                  
                  </div>
                </div>
                <div>
                  <div class='flex items-center justify-between'>
                    <label class='text-base font-medium text-gray-900'>
                      Password
                    </label>
                  </div>
                  <div class='mt-2'>
                    <input
                      placeholder='Password'
                      type='password'
                      class='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      name='password'
                    />
                  </div>

                  <div class='mt-2'> <p class='mt-2 text-base text-gray-600'>
                    Forget Password ?  {' '}
                    <a href='/forgetpassword' class='text-blue-600 hover:underline'>
                      Forget
                    </a>
                  </p></div>
                </div>
                <div>
                  <button
                    class='inline-flex w-full items-center mt-10 justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                    type='button'
                  >
                    Login 
                  </button>
                  <h2 class='text-2xl font-bold leading-tight'></h2>
                  <p class='mt-2  text-base text-gray-600'>
                    Don't have an account?{' '}
                    <a href='/signup' class='text-blue-600 hover:underline'>
                      Signup
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
