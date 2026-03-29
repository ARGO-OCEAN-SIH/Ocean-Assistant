'use client'

import { useState } from 'react'
import Feature from '../components/Feature'
import Navbar from '../components/Navbar'
import Intro from '../components/Intro'
import Content from '../components/Content'
import Teams from '../components/Teams'


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900">
     <Navbar />
     <Intro />
     <hr />
      <Feature />
      <Content/>
      <Teams/>
    </div>
  )
}
