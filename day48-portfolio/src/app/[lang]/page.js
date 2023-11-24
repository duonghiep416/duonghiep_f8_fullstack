'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Header from '../component/Header/Header'
export default function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <Header />
      </NextThemesProvider>
    </NextUIProvider>
  )
}
