import { Grid, Box, Heading, Text } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Layout from '../layout';
import Animation from '../components/Animation';
import { getAboutInfo } from '../utils';
import { AboutInterface } from '../interfaces/About';

type AboutProps = {
	aboutData: AboutInterface;
};

export const getStaticProps = async () => {
	const aboutData = await getAboutInfo();

	return {
		props: {
			aboutData,
		},
	};
};

const About = ({ aboutData }: AboutProps) => {
	const about = aboutData.about;

	return (
		<Layout title='Community | About Us'>
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
							{about.title}
						</Heading>

						<Box>
							{about.description.map(paragraph => (
								<Text
									key={paragraph.id}
									color='dark-grayish-blue'
									marginBottom='2rem'
								>
									{paragraph.text}
								</Text>
							))}
						</Box>
					</Box>
					<Box className='image'>
						<LazyLoadImage
							loading='lazy'
							effect='blur'
							src={about.image}
							alt={about.title}
						/>
					</Box>
				</Grid>
			</Animation>
		</Layout>
	);
};

export default About;
