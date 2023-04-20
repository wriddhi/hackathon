"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

const Navbar = ({ children }: { children: ReactNode }) => {

  const links = ["/", "/register", "/login"]

  const pathname = usePathname()

  if (links.includes(pathname)) {

    return (
      <div className="drawer font-lastica text-sm lg:text-lg font-bold text-outline-1 tracking-[0.2em] lg:px-4">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-black lg:p-12">
            <div className="flex-none lg:hidden">
              <label htmlFor="sidebar" className="btn btn-circle swap swap-rotate">
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
              </label>
            </div>
            <div className="flex-1 p-2 mx-2 flex justify-center lg:justify-start items-center gap-2">
              <Image className='hidden lg:flex cursor-none m-0' src='/JISU.svg' alt='Hackathon' width={70} height={70} />
              <Image className='flex lg:hidden cursor-none m-0' src='/JISU.svg' alt='Hackathon' width={35} height={35} />
              <span> X </span>
              <span> Programado </span>
            </div>
            <nav className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal flex justify-center items-center gap-12 tracking-[0.2em]">
                {
                  links.map((link, index) => (
                    <li key={index}>
                      <Link className='hover:text-outline-2 transition-all p-4' href={link}>
                        {
                          link === "/" ? "Home" : link.split("/")[1]
                        }
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </div>
          {
            children
          }
        </div>
        <nav className="drawer-side bg-black">
          <label htmlFor="sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 bg-slate-950">
            {
              links.map((link, index) => (
                <li key={index}>
                  <Link className='hover:text-outline-2 transition-all p-4' href={link}>
                    {
                      link === "/" ? "Home" : link.split("/")[1]
                    }
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}

export default Navbar