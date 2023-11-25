import { en } from '@/dictionaries/en'
import { vi } from '@/dictionaries/vi'
import { Chip, Image } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function Section({ className, Children, id }) {
  const params = useParams()
  const [dictionary, setDictionary] = useState(params.lang === 'vi' ? vi : en)
  return (
    <div className={`${className}`} id='about'>
      <Chip
        variant='bordered'
        color='secondary'
        classNames={{
          base: 'hover:bg-secondary hover:text-white cursor-pointer'
        }}
      >
        {dictionary[id].tag}
      </Chip>
      <Children dictionary={dictionary} />
    </div>
  )
}
export default Section
