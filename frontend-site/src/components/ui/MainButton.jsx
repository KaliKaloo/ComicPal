import React from 'react'

function MainButton({styles, text}) {
  return (
    <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary outline-none rounded-full ${styles}`}>
      {text}
    </button>
    )
}

export default MainButton