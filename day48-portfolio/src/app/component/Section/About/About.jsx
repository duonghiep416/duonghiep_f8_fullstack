import { en } from '@/dictionaries/en'
import { vi } from '@/dictionaries/vi'
import { Chip, Image } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function About({ className, id }) {
  const params = useParams()
  const [dictionary, setDictionary] = useState(params.lang === 'vi' ? vi : en)
  return (
    <div className='about-content flex justify-between items-center'>
      <div className='about-me basis-6/12 flex flex-col gap-10'>
        <h1 className='font-bold text-4xl'>
          {`${dictionary.about.title} ${dictionary.about.name} ${dictionary.about.icon}`}
        </h1>
        <p className='text-xl leading-9 text-justify'>
          {dictionary.about.description}
        </p>
      </div>
      <div className='image basis-4/12'>
        <Image
          src='https://avatars.githubusercontent.com/u/49095200?v=4'
          alt='Dương Hiệp'
          width={400}
          height={400}
        />
      </div>
    </div>
  )
}
export default About
