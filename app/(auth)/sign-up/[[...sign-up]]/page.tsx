import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUppage = () => {
  return (
    <main className='auth-page'>
        <SignUp />
    </main>
  )
}

export default SignUppage