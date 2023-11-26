'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Header from '../component/Header/Header'
import About from '../component/Section/About/About'
import Section from '../component/Section/Section'
import Skills from '../component/Section/Skills/Skills'
import Projects from '../component/Section/Projects/Projects'
export default function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <Header />
        <main className='container mx-auto'>
          <Section Children={About} id='about' className='pt-20' />
          <Section Children={Skills} id='skills' className='pt-20' />
          {/* <Section Children={Projects} id='project' className='pt-20' /> */}
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
