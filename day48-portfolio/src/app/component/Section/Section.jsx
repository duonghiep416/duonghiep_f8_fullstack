import { en } from '@/dictionaries/en'
import { vi } from '@/dictionaries/vi'
import { Chip, Image } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

function Section({ className, Children, id }) {
  const params = useParams()
  const [dictionary, setDictionary] = useState(params.lang === 'vi' ? vi : en)
  return (
    <>
      <div className={`max-w-fit mx-auto mb-10 ${className}`} id={id}>
        <Chip
          variant='bordered'
          color='secondary'
          classNames={{
            base: 'hover:bg-secondary hover:text-white cursor-pointer'
          }}
        >
          {dictionary[id].tag}
        </Chip>
      </div>
      <Children dictionary={dictionary} />
    </>
  )
}
export default Section
