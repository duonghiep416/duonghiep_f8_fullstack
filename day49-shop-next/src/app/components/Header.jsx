'use client'
import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import { useSearch } from '../context/searchContext'
import { useRouter } from 'next/navigation'
export default function Header() {
  const { searchValue, updateSearchValue } = useSearch()
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearchValue(searchValue)
    router.push(`/pages?q=${searchValue}`)
  }
  return (
    <Navbar maxWidth='full' isBordered classNames='flex justify-between'>
      <NavbarBrand>
        <Link href='/'>
          <Image src='/logo.png' width={50} height={50} alt='Shop' />
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Link color='foreground' href='/'>
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='/library'>
            Thư viện
          </Link>
        </NavbarItem>
        <NavbarItem>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Tìm kiếm'
              value={searchValue}
              onChange={(e) => updateSearchValue(e.target.value)}
              className='border-none outline-none w-64 h-10 pl-4 rounded-md shadow-md'
            />
          </form>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
