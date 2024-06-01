import React from 'react'

function HeaderCard() {
  return (
    <div className="relative Header-card text-white rounded-lg overflow-hidden">
        <div className="absolute bottom-4 left-4">
            <div className="text-[2rem]">Frontend Mentor</div>  
            <div className="opacity-50">Feedback Board</div>
        </div>
        <img src="/background-header.png" className="w-[20rem]" quality={100} alt="Background header" />
      </div>
  )
}

export default HeaderCard