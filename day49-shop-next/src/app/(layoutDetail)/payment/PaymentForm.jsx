'use client'
import React, { useState } from 'react'
import { Input } from '@nextui-org/react'
import emailjs from '@emailjs/browser'
import { configEmailjs } from '@/app/config'

export default function PaymentForm({ id, nameProduct }) {
  console.log(nameProduct)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [dateStart, setDateStart] = useState('')

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setEmail('')
    setName('')
    setPhone('')
    setDateStart('')
    const { SERVICE_ID, TEMPLATE_ID, API_KEY } = configEmailjs
    const templateParams = {
      email,
      name,
      phone,
      dateStart,
      location: decodeURIComponent(nameProduct)
    }
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, API_KEY)
  }

  return (
    <div>
      <form action='' onSubmit={handleSubmitForm}>
        <div className='flex max-w-xl flex-wrap md:flex-nowrap gap-4 mx-auto mb-10'>
          <Input
            isClearable
            type='email'
            label='Email'
            isRequired
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex max-w-xl flex-wrap md:flex-nowrap gap-4 mx-auto mb-10'>
          <Input
            isClearable
            type='text'
            label='Name'
            isRequired
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex max-w-xl flex-wrap md:flex-nowrap gap-4 mx-auto mb-10'>
          <Input
            isClearable
            type='number'
            label='Phone'
            isRequired
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex max-w-xl flex-wrap md:flex-nowrap gap-4 mx-auto mb-10'>
          <Input
            isClearable
            type='date'
            label='Day start'
            isRequired
            name='dateStart'
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </div>
        <div className='flex max-w-xl flex-wrap md:flex-nowrap gap-4 mx-auto mb-10'>
          <button className='bg-orange-700 px-5 py-2 rounded-lg'>Submit</button>
        </div>
      </form>
    </div>
  )
}
