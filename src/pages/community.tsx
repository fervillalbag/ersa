import React, { useContext } from 'react'
import { GetStaticProps } from 'next'
import { Box, Image, Text } from '@chakra-ui/react'
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

    return {
      props: {
        banners: banners.data
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const Community: React.FC<CommunityIprops> = ({ banners }) => {
  const { showNavbar } = useContext(NavbarContext)

  return (
    <Layout title="Community">
      <Box position="relative">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className={`${showNavbar ? 'hidden' : 'block'}`}
        >
          {banners &&
            banners.map((slide: Banner) => (
              <SwiperSlide key={slide.image}>
                <Image
                  src={slide.image}
                  width="100%"
                  height="450px"
                  objectFit="cover"
                  alt=""
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>

      <Box
        maxWidth="1170px"
        margin="0 auto"
        width="90%"
        padding={{ base: '3rem 0', lg: '5rem 0' }}
      >
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta minus
          mollitia necessitatibus quibusdam, temporibus quaerat non totam
          tempore magni aspernatur suscipit dignissimos error soluta. Architecto
          eveniet officiis nihil autem distinctio? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Similique in magni ab qui tempora
          ratione assumenda odit, sed architecto dolore, quasi sit at nam
          exercitationem voluptas id tempore! Dolor, deserunt!
        </Text>
      </Box>
    </Layout>
  )
}

export default Community
