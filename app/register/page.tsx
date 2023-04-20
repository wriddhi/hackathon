"use client"


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  
  const [team, setTeam] = React.useState<'join' | 'create'>('join')
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const body = {
      roll: e.currentTarget.roll.value,
      name: e.currentTarget.fullname.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
      email: e.currentTarget.email.value,
      year: e.currentTarget.year.value,
      team: e.currentTarget.team.value,
      action: team
    }

    const res = await axios.post('/api/register', body)

    const data = await res.data
    

    if(data.ok) {
      router.push('/login')
    }

  }

  return (
    <main className="w-full h-screen flex flex-col lg:flex-row justify-center lg:justify-evenly items-center my-40">
      <Image className='hidden lg:flex -z-[100] rotate-90' src="/blob-2.gif" alt="Next.js logo" width={900} height={900} />
      <Image className='flex lg:hidden rotate-90 -z-[100] absolute' src="/blob-2.gif" alt="Next.js logo" width={700} height={700} />
      <form onSubmit={handleSubmit} className='outline-slate-700 outline-1 outline rounded-2xl backdrop-blur-lg bg-white/10 w-5/6 lg:w-1/3 flex flex-col justify-evenly items-center gap-6 p-6'>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="roll" className="text-gray-500 w-full">Roll Number</label>
          <input required type="roll" id="roll" className="bg-white/10 p-2 font-sans w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="fullname" className="text-gray-500 w-full">Full name</label>
          <input required type="fullname" id="fullname" className="bg-white/10 p-2 font-sans w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-gray-500 w-full">Email</label>
          <input required type="email" id="email" className="bg-white/10 p-2 font-sans w-full" />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 w-full">
          <label htmlFor="year" className="text-gray-500 w-full">Year</label>
          <span className='w-full flex justify-between items-center gap-2'>
            <input type="radio" name="year" className="radio radio-primary" defaultChecked value="1st" />1st
            <input type="radio" name="year" className="radio radio-primary ml-auto" value="2nd" />2nd
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-gray-500 w-full">Password</label>
          <input required type="password" id="password" className="bg-white/10 p-2 font-sans w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="confirmPassword" className="text-gray-500 w-full">Confirm Password</label>
          <input required type="password" id="confirmPassword" className="bg-white/10 p-2 font-sans w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="team">Team</label>
          <div className='flex justify-between items-center gap-2 '>
            {
              team === 'join' ? (
                <>
                  <span onClick={() => { setTeam('join') }} className='bg-white text-black text-outline-1 text-outline-black w-1/2 text-center p-2 cursor-pointer'>
                    JOIN
                  </span>
                  <span onClick={() => { setTeam('create') }} className='bg-white/20 text-black text-outline-1 text-outline-black w-1/2 text-center p-2 cursor-pointer'>
                    CREATE
                  </span>
                </>
              ) : (
                <>
                  <span onClick={() => { setTeam('join') }} className='bg-white/20 text-black text-outline-1 text-outline-black w-1/2 text-center p-2 cursor-pointer'>
                    JOIN
                  </span>
                  <span onClick={() => { setTeam('create') }} className='bg-white text-black text-outline-1 text-outline-black w-1/2 text-center p-2 cursor-pointer'>
                    CREATE
                  </span>
                </>
              )
            }
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="team" className="text-gray-500 w-full">Team Name</label>
          <input required type="team" id="team" className="bg-white/10 p-2 font-sans w-full" />
          <span className='text-xs font-mono text-outline-0 text-slate-400'>
            {team === 'join' ? 'Enter team name given by your leader' : 'Create a new team with a unique name'}
          </span>
        </div>
        <button type='submit' className="bg-white/80 text-black p-2 w-full text-center text-outline-black tracking-widest hover:bg-white transition-all">
          Register
        </button>
      </form>
    </main>
  )
}