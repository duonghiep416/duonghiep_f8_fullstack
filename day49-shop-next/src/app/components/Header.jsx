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
export default function Header() {
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
        {/* <NavbarItem>
          <Link color='foreground' href='/detail'>
            Chi tiết
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='/payment'>
            Thanh toán
          </Link>
        </NavbarItem> */}
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
