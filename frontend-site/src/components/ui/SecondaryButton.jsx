import React from 'react'

function SecondaryButton({styles, text}) {
  return (
    <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary outline outline-2  outline-offset-2 rounded-[10px] ${styles}`}>
      {text}
    </button>
    )
}

export default SecondaryButton