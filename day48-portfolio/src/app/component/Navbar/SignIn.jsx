import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  NavbarItem
} from '@nextui-org/react'
import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
export default function SignIn() {
  const session = useSession()
  if (session.status === 'loading') {
    return 'Loading or not authenticated...'
  }
  if (session.status === 'unauthenticated') {
    return (
      <Link href='/auth/signin' color='foreground'>
        Sign in
      </Link>
    )
  }
  return (
    <NavbarItem>
      <Dropdown>
        <DropdownTrigger>
          <Button>
            {session.data.user.name}
            <Image
              src={session.data.user.image}
              alt='avatar'
              width={30}
              height={30}
              className='rounded-full ml-2'
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>
            <Link href='/profile' color='foreground'>
              Profile
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Button color='foreground' onClick={() => signOut()}>
              Sign out
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  )
}
