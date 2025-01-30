import React from 'react'

const NavBar = () => {
  return (
   
    <nav className='container bg-slate-600  text-white w-full '>
       
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-11  '>
        <div className='logo  font-extrabold text-2xl'>
           <span className='text-green-950'>&lt;</span>
            Pass
           <span className='text-green-950'>Man/&gt;</span></div>
      
      <button className='text-white bg-gray-900 my-5 rounded-full flex justify-between items-center'>
        <img className='invert w-10 p-1' src='/icons/github.svg' alt='github'/>
        <span className='font-bold px-2' >GitHub</span>
      </button>
      </div>
      
    </nav>
  
  )
}

export default NavBar
