import React from 'react'
import Header from '../component/Header/Header'
import About from '../component/Section/About/About'
import Section from '../component/Section/Section'
import Skills from '../component/Section/Skills/Skills'
import Projects from '../component/Section/Projects/Projects'
export default async function App() {
  return (
    <>
      <Header />
      <main className='container mx-auto'>
        <Section Children={About} id='about' className='pt-20' />
        <Section Children={Skills} id='skills' className='pt-20' />
        <Section Children={Projects} id='project' className='pt-20' />
      </main>
    </>
  )
}
