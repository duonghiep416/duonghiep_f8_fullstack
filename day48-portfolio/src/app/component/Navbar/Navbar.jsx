import { en } from '@/dictionaries/en'
import { vi } from '@/dictionaries/vi'
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
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CtNavbar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const params = useParams()
  const [dictionary, setDictionary] = useState(params.lang === 'vi' ? vi : en)
  useEffect(() => {
    localStorage.getItem('lang') === 'vi'
      ? router.push('vi')
      : router.push('en')

    setDictionary(params.lang === 'vi' ? vi : en)
  }, [params.lang])
  return (
    <NavbarContent justify='between'>
      <NavbarItem>
        <Link href='#about' color='foreground'>
          {dictionary.navigation.about}
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='#skills' color='foreground'>
          {dictionary.navigation.skills}
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='#project' color='foreground'>
          {dictionary.navigation.projects}
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='#contact' color='foreground'>
          {dictionary.navigation.contact}
        </Link>
      </NavbarItem>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered'>
            {dictionary.navigation.themes.title}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => setTheme('light')}>
            {dictionary.navigation.themes.light}
          </DropdownItem>
          <DropdownItem onClick={() => setTheme('dark')}>
            {dictionary.navigation.themes.dark}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered'>
            {dictionary.navigation.language.title}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              router.push('vi')
              localStorage.setItem('lang', 'vi')
              setDictionary(vi)
            }}
          >
            {dictionary.navigation.language.vietnamese}
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              router.push('en')
              localStorage.setItem('lang', 'en')
              setDictionary(en)
            }}
          >
            {dictionary.navigation.language.english}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  )
}
