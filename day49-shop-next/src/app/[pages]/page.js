import React from 'react'
import { API } from '../config'
import CardItem from '../components/CardItem'
export const metadata = {
  title: 'Search',
  description: 'Search Shop'
}
async function getData(path) {
  const response = await fetch(API + path)
  const data = await response.json()
  return data
}
export default async function SearchPage({ params, searchParams }) {
  const data = await getData(`/pages?q=${searchParams.q}`)
  return data.length > 0 && <CardItem data={data} />
}
