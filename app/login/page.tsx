"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const roll = e.currentTarget.roll.value
    const password = e.currentTarget.password.value

    const res = await axios.post('/api/login', { roll, password })

    const data = await res.data


    if(data.ok) {
      router.push('/dashboard')
    }
  }

  return (
    <main className="w-full h-full flex flex-col lg:flex-row justify-center lg:justify-evenly items-center">
      <Image className='hidden lg:flex -z-[100]' src="/blob-2.gif" alt="Next.js logo" width={700} height={700} />
      <Image className='flex lg:hidden rotate-90 -z-[100] absolute' src="/blob-2.gif" alt="Next.js logo" width={700} height={700} />
      <form onSubmit={handleSubmit} className='outline-slate-700 outline-1 outline flex flex-col justify-evenly items-center gap-6 w-5/6 lg:w-1/3 p-4 lg:p-20 rounded-2xl backdrop-blur-lg bg-white/10'>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="roll" className="text-gray-500 w-full">Roll Number</label>
          <input type="roll" id="roll"  className="bg-white/10 p-2 font-sans w-full"/>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-gray-500 w-full">Password</label>
          <input type="password" id="password"  className="bg-white/10 p-2 font-sans w-full"/>
        </div>
        <button type="submit" className="bg-white/80 text-black p-2 w-full text-outline-black tracking-widest hover:bg-white transition-all">Login</button>
      </form>
    </main>
  )
}