import FormAuth from '@/app/component/FormAuth/FormAuth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Auth() {
  const session = await getServerSession()
  if (session) {
    redirect('/')
  }
  return (
    <div className='h-screen flex items-center justify-center'>
      <FormAuth type='signup' />
    </div>
  )
}
