import React from 'react'
import { listSkills } from './listSkills'
import { Image } from '@nextui-org/react'
function Skills({ dictionary }) {
  return (
    <>
      <p className='text-center mb-20'>{dictionary.skills.description}</p>
      <div className='grid grid-cols-8 gap-16'>
        {listSkills.map((skill, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center'
          >
            <Image
              src={skill.pathImage}
              alt={skill.name}
              width={60}
              height={60}
            />
            <p className='text-center mt-2'>{skill.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
export default Skills
