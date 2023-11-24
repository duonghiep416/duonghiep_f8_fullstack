import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { getDictionary } from '@/lib/dictionary'
import { useParams } from 'next/navigation'

export default async function CtNavbar() {
  const params = useParams()
  const { page } = await getDictionary(params.lang)
  const { theme, setTheme } = useTheme()
  console.log(page)
  return (
    <NavbarContent justify='between'>
      <NavbarItem>
        <Link href='#about' color='foreground'>
          About
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='#skills' color='foreground'>
          Skills
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='#projects' color='foreground'>
          Projects
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='#contact' color='foreground'>
          Contact
        </Link>
      </NavbarItem>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered'>Themes</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => setTheme('light')}>Light</DropdownItem>
          <DropdownItem onClick={() => setTheme('dark')}>Dark</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered'>Languages</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Vietnamese</DropdownItem>
          <DropdownItem>English</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  )
}
