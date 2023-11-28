import { API, IMGLINK } from '@/app/config'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import React from 'react'
export const metadata = {
  title: 'Detail',
  description: 'Detail Shop'
}
async function getData(path) {
  const response = await fetch(API + path)
  const data = await response.json()
  return data
}

export default async function Detail({ params }) {
  const { id } = params
  const data = await getData(`/pages/${id}`)
  return (
    <div>
      <h2 className='text-3xl font-bold text-center'>{data.home.name}</h2>
      <h3 className='text-xl font-bold text-center'>{data.home.content}</h3>
      <p className=''>{data.home.textcontent}</p>
      {data.destinationBox.map((destination, index) => (
        <Card className='py-4 mb-5' key={index}>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <p className='text-2xl uppercase font-bold'>{destination.h3}</p>
            <h4 className='font-bold text-large'>{destination.p}</h4>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              alt='Card background'
              className='object-cover rounded-xl'
              src={IMGLINK + destination.src}
              width={270}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
