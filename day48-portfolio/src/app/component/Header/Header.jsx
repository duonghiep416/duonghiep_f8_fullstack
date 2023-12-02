import { Navbar } from '@nextui-org/react'
import React from 'react'
import Brand from '../Brand/Brand'
import CtNavbar from '../Navbar/Navbar'
export default function Header() {
  return (
    <Navbar isBordered shouldHideOnScroll maxWidth='full'>
      <Brand />
      <CtNavbar />
    </Navbar>
  )
}
