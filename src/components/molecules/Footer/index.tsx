import React from 'react'

const Footer = () => {

  const CurrentYear = new Date().getFullYear()
  // console.log(CurrentYear)

  return (
    <div className='mx-auto max-w-[1152px] px-3 pb-4 text-[13px] '>
      <p className=''>Privacy Policy │ Site Policy</p>
      <p className=''>© {CurrentYear} Exchange Credit Program. All rights reserved.</p>
    </div>
  )
}

export default Footer
