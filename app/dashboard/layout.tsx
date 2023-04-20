

export const metadata = {
  title: 'Dashboard',
  description: 'Built for Programado Hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
