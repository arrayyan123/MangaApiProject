import HomeMain from '@/Components/Home/HomeMain'
import Navbar from '@/Components/Navbar/Navbar'
import Carousel from '@/Components/Slider/Carousel'
import {React} from 'react'

function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <div>
          <Carousel></Carousel>
          <HomeMain></HomeMain>
        </div>
    </div>
  )
}

export default Home