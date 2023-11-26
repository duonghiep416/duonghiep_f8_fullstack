import { Card, CardBody, Chip, Image, Link } from '@nextui-org/react'
import React from 'react'
import { listProject } from './listProject'
import { useParams } from 'next/navigation'
export default function ProjectCard() {
  const params = useParams()
  const lang = params.lang
  return (
    <div className='flex flex-col gap-4 max-w-screen-xl mx-auto'>
      {listProject.map((project, index) => (
        <Card isBlurred key={index}>
          <CardBody>
            <div className='flex items-center gap-8'>
              <div className='card-image'>
                <img
                  src={project.pathImage}
                  alt={project.name}
                  className='object-cover w-[500px] h-72 rounded-md'
                />
              </div>
              <div className='card-info'>
                <Link
                  isBlock
                  isExternal
                  showAnchorIcon
                  href={project.linkDemo}
                  color='secondary'
                  className='text-2xl font-bold'
                >
                  {project.name}
                </Link>
                <p className='text-xl card-description ml-2'>
                  {lang === 'vi'
                    ? project.descriptionVi
                    : project.descriptionEn}
                </p>
                <div className='flex gap-2 mt-5 ml-2'>
                  {project.techList.map((tech, index) => (
                    <Chip key={index}>{tech}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
