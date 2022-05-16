import { Grid, Box, Heading } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Layout from '../layout';
import Animation from '../components/Animation';
import { NextPage } from 'next';
// import { getAboutInfo } from '../utils';
import { AboutInfo } from '../interfaces/About';

type AboutProps = {
	aboutInfo: AboutInfo;
};

const About: NextPage<AboutProps> = () => {
	return (
		<Layout title='About Us'>
			<Animation>
				<Grid
					gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
					maxWidth='1170px'
					margin='0 auto'
					width='90%'
					paddingTop={{ base: '0', lg: '2rem' }}
					paddingBottom='4rem'
					gap='2rem 5rem'
				>
					<Box>
						<Heading as='h3' color='dark-blue' marginBottom='2rem'>
							{/* {aboutInfo.title} */}
						</Heading>

						<Box>
							{/* {aboutInfo.description.map(paragraph => (
								<Text
									key={paragraph.id}
									color='dark-grayish-blue'
									marginBottom='2rem'
								>
									{paragraph.text}
								</Text>
							))} */}
						</Box>
					</Box>
					<Box className='image'>
						<LazyLoadImage
							loading='lazy'
							effect='blur'
							// src={aboutInfo.image}
							alt=''
						/>
					</Box>
				</Grid>
			</Animation>
		</Layout>
	);
};

export default About;
