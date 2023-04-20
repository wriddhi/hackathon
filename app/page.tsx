import Image from 'next/image'

export default function Home() {
  return (
    <main className='w-full h-full relative px-10 lg:px-32 flex flex-col justify-start items-center gap-10'>
      <Image priority className='absolute -z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 lg:-translate-x-1/4 lg:-translate-y-1/2' src='/blob.gif' alt='Blob.js' width={800} height={800} />
      <h1 className='text-2xl lg:text-7xl font-lastica text-outline-1 lg:text-outline-3 font-extrabold tracking-[0.2em] z-10 flex flex-col gap-2 justify-center items-center lg:items-start my-10 lg:mr-auto text-slate-100'>
        <span>COLLEGE</span>
        <span>DEVELOPMENT</span>
        <span>HACKATHON</span>
      </h1>
      <p className='writer font-sans text-xs md:text-2xl mt-auto mb-10 lg:my-0 lg:mr-auto text-purple-500 text-outline-0 '>
        <span className='writer-text uppercase'>
          &lt; Code for a cause / &gt;
        </span>
      </p>
      <div className='text-xs lg:text-lg font-bold mb-10 lg:w-60 lg:border-l-4 border-white lg:p-4 lg:ml-auto animate-pulse text-center lg:text-start w-full'>
        Create something that will help your community
      </div>
    </main>
  )
}