'use client'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { signIn } from 'next-auth/react'
export default function FormAuth({ type }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    signIn('credentials', {
      isSignup: type === 'signup',
      name,
      username: email,
      password
    })
  }
  return (
    <div className='p-7 shadow-lg bg-black/5 dark:bg-white rounded-3xl'>
      <h2 className='font-bold text-3xl dark:text-black text-center'>
        WELCOME BACK
      </h2>
      <p className='text-gray-400 dark:text-gray-600 text-center mb-10'>
        Hey, Enter your details to get{' '}
        {type === 'signup' ? 'sign up' : 'sign in'} to your account
      </p>
      <form action='' className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {type === 'signup' && (
          <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
            <Input
              type='text'
              label='Name'
              placeholder='Enter your name'
              value={name}
              onChange={handleChangeName}
              required
            />
          </div>
        )}
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <Input
            type='text'
            label='Username'
            placeholder='Enter your username'
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <Input
            type='password'
            label='Password'
            placeholder='Password'
            value={password}
            onChange={handleChangePassword}
            required
          />
        </div>
        {type === 'signup' && (
          <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
            <Input
              type='password'
              placeholder='Confirm Password'
              label='Confirm Password'
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
            />
          </div>
        )}
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <button className='w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-3 rounded-lg'>
            {type === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </form>
      {type !== 'signup' && (
        <>
          <p className='text-center text-black my-7'>---Or Sign In with---</p>
          <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
            <Button
              className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white p-3 rounded-lg'
              onClick={() => {
                signIn('github')
              }}
            >
              Github
            </Button>
            <Button
              className='w-full bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white p-3 rounded-lg'
              onClick={() => {
                signIn('google')
              }}
            >
              Google
            </Button>
          </div>
        </>
      )}

      <p className='text-center text-black my-7'>
        {type === 'signup' ? 'Have an account ' : "Don't have an account? "}
        <Link
          href={type === 'signup' ? '/auth/signin' : '/auth/signup'}
          className='text-blue-500'
        >
          {type === 'signup' ? 'Sign In' : 'Sign Up'}
        </Link>
      </p>
    </div>
  )
}
