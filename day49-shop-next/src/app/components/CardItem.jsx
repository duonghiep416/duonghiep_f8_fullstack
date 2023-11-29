import { Button, Link } from '@nextui-org/react'
import React from 'react'
export default function CardItem({ data }) {
  return data.map((page) => (
    <div key={page.id}>
      <Link href={`/detail/${page.id}`} showAnchorIcon color='primary'>
        <h2 className='text-3xl font-bold text-center'>{page.home.name}</h2>
      </Link>
      <h3 className='text-xl font-bold text-center'>{page.home.content}</h3>
      <p className=''>{page.home.textcontent}</p>
      <Link href={`/payment/${page.home.name}/${page.id}`}>
        <Button color='primary' variant='bordered'>
          Mua ngay
        </Button>
      </Link>
    </div>
  ))
}
