import React from 'react'
import { listSkills } from './listSkills'
export default function Skills() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <p>The skills, tools and technologies</p>
      {listSkills.map((skill, index) => (
        <div key={index} className='flex flex-col items-center justify-center'>
          <img
            src={`/static/iconSkills${skill.pathImage}`}
            alt={skill.name}
            className='w-20 h-20'
          />
          <p className='text-center'>{skill.name}</p>
        </div>
      ))}
    </div>
  )
}
