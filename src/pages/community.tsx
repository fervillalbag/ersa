import React, { useContext } from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import Layout from '../layout'
import Animation from '../components/Animation'
import { NavbarContext } from '../context/Navbar'

import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const Community: React.FC = () => {
  const { showNavbar } = useContext(NavbarContext)

  return (
    <Layout title="Community">
      <Animation>
        <Box position="relative" backgroundColor="gray">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className={`${showNavbar ? 'hidden' : 'block'}`}
          >
            <SwiperSlide>
              <Image
                src={''}
                width="100%"
                height="450px"
                objectFit="cover"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </Box>

        <Box
          maxWidth="1170px"
          margin="0 auto"
          width="90%"
          padding={{ base: '3rem 0', lg: '5rem 0' }}
        >
          <Text color="dark-grayish-blue">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
            minus mollitia necessitatibus quibusdam, temporibus quaerat non
            totam tempore magni aspernatur suscipit dignissimos error soluta.
            Architecto eveniet officiis nihil autem distinctio? Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Similique in magni ab
            qui tempora ratione assumenda odit, sed architecto dolore, quasi sit
            at nam exercitationem voluptas id tempore! Dolor, deserunt!
          </Text>
        </Box>
      </Animation>
    </Layout>
  )
}

export default Community
