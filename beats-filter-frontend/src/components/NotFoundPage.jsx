import React from 'react'

export default function NotFoundPage() {
  return (
    <div>
      <div className='flex justify-center text-lg font-bold'>
        <p>This page does not exist</p>
    </div>
    <div className='flex justify-center bg-yellow-100 hover:bg-yellow-200 rounded-lg'>
        <a href="/home">Return home</a>
    </div>
    </div>
  )
}
