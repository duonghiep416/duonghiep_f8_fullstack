import { API, IMGLINK } from '@/app/config'
import { Image } from '@nextui-org/react'
export const metadata = {
  title: 'Library',
  description: 'Library Shop'
}
import React from 'react'
async function getData(path) {
  const response = await fetch(API + path)
  const data = await response.json()
  return data
}

export default async function Library() {
  const data = await getData('/pages')
  return (
    <div>
      {data.map((page) => (
        <div key={page.id}>
          <h2 className='text-3xl font-bold text-center mb-7'>
            {page.home.name}
          </h2>
          <div className='grid grid-cols-6 gap-4 mb-7'>
            {page.galleryBox.map((gallery) => (
              <Image
                src={IMGLINK + gallery.src}
                alt='Image'
                key={gallery.id}
                className='object-cover w-96 h-96'
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
