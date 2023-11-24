import { Navbar } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React from 'react'
import Brand from '../Brand/Brand'
import CtNavbar from '../Navbar/Navbar'
export default function Header() {
  return (
    <header className=''>
      <Navbar isBordered shouldHideOnScroll>
        <Brand />
        <CtNavbar />
      </Navbar>
    </header>
  )
}
