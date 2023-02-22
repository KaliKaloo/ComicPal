import React from 'react'

function SecondaryButton({styles, text, func}) {
  return (
    <button type="button" onClick={func} className={`py-3 px-6 font-poppins font-medium text-[18px]  rounded-md ${styles}`}>
      {text}
    </button>
    )
}

export default SecondaryButton