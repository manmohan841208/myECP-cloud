import React from 'react'
import LoginTemplate from '@/templates/login/loginTemplate';
import Login from '@/components/organisms/Login/page'

const LoginPage = () => {
  return (
    <div className="flex md:px-16 px-4 py-3 gap-8 w-full justify-center">
      <LoginTemplate>
        <Login />
      </LoginTemplate>
    </div>
  )
}

export default LoginPage
