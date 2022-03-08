import React, { useContext } from 'react'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import Layout from '../layout'
import { NavbarContext } from '../context/Navbar'
import { Banner } from '../interfaces/Banner'

import 'swiper/css/navigation'
import 'swiper/css/autoplay'

interface CommunityIprops {
  banners: Banner[]
}

export const getStaticProps: GetStaticProps = async () => {
  const URL = process.env.URL_ROOT

  try {
    const bannersResponse = await fetch(`${URL}/api/banner`)
    const banners = await bannersResponse.json()

    if (!banners) {
      return { notFound: true }
    }

    return {
      props: {
        banners: banners.data
      }
    }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

const Community: React.FC<CommunityIprops> = ({ banners }) => {
  const { showNavbar } = useContext(NavbarContext)

  return (
    <Layout>
      <Box>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className={`relative h-72 lg:h-[450px] px-20 ${
            showNavbar ? 'hidden' : 'block'
          }`}
        >
          {banners &&
            banners.map((slide: Banner) => (
              <SwiperSlide
                key={slide.image}
                className="bg-slate-300 text-white"
              >
                <img
                  src={slide.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Layout>
  )
}

export default Community
