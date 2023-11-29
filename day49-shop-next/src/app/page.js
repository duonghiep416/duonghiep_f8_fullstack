import { API } from './config'
import CardItem from './components/CardItem'
async function getData(path) {
  const response = await fetch(API + path)
  const data = await response.json()
  return data
}

export default async function Home() {
  const data = await getData('/pages')
  return (
    <main className='container mx-auto'>
      <CardItem data={data} />
    </main>
  )
}
