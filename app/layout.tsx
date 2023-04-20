import Navbar from '@/components/Navbar'
import './globals.css'

import localFont from 'next/font/local'

const lastica = localFont({ src: '../public/Lastica.ttf', variable: '--font-lastica' })

export const metadata = {
  title: 'Hackathon',
  description: 'Built for JIS University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lastica.variable} bg-black text-white`}>
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  )
}
