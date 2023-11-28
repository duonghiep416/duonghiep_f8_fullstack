import React from 'react'
import PaymentForm from '../../PaymentForm'
export const metadata = {
  title: 'Payment',
  description: 'Payment Shop'
}
export default function Payment({ params }) {
  const { id, name } = params
  return <PaymentForm id={id} nameProduct={name} />
}
