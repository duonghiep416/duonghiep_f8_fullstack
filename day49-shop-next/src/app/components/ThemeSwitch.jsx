'use client'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React from 'react'

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='bordered'>Switch Theme</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onClick={() => setTheme('light')}>Light</DropdownItem>
        <DropdownItem onClick={() => setTheme('dark')}>Dark</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
