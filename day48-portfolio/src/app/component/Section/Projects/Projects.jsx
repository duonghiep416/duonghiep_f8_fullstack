'use client'
import React from 'react'
import ProjectCard from './ProjectCard'
function Projects({ dictionary }) {
  return (
    <>
      <p className='text-center mb-20'>{dictionary.project.description}</p>
      <ProjectCard />
    </>
  )
}
export default Projects
