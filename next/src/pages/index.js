

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-2 mix-blend-difference text-white'>Rifke</h1>
      <button className='fixed top-0 left-1/2 -translate-x-1/2 p-2 uppercase mix-blend-difference text-white'>
        Info
      </button>
      <button className='fixed bottom-0 left-1/2 -translate-x-1/2 text-center p-2 uppercase mix-blend-difference text-white'>
        Ask me anything
      </button>
      <button className='fixed top-1/2 left-0 p-2 uppercase mix-blend-difference text-white'>Previous</button>
      <button className='fixed top-1/2 right-0 p-2 uppercase mix-blend-difference text-white'>Next</button>
    </main>
  )
}
