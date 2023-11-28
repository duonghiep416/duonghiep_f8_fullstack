import { Button, Link } from '@nextui-org/react'
import { API } from './config'
async function getData(path) {
  const response = await fetch(API + path)
  const data = await response.json()
  return data
}

export default async function Home() {
  const data = await getData('/pages')
  return (
    <main className='container mx-auto'>
      {data.map((page) => (
        <div key={page.id}>
          <Link href={`/detail/${page.id}`} showAnchorIcon color='primary'>
            <h2 className='text-3xl font-bold text-center'>{page.home.name}</h2>
          </Link>
          <h3 className='text-xl font-bold text-center'>{page.home.content}</h3>
          <p className=''>{page.home.textcontent}</p>
          <Link href='/payment'>
            <Button color='primary' variant='bordered'>
              Mua ngay
            </Button>
          </Link>
        </div>
      ))}
    </main>
  )
}
