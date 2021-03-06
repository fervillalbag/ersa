import { Grid, Box, Heading, Text } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Layout from '../layout';
import { getAboutInfo } from '../utils';
import { AboutInterface } from '../interfaces/About';
import { GetStaticProps } from 'next';

type AboutProps = {
	aboutData: AboutInterface;
};

export const getStaticProps: GetStaticProps = async () => {
	const aboutData = await getAboutInfo();

	return {
		props: {
			aboutData,
		},
		revalidate: 1,
	};
};

const About = ({ aboutData }: AboutProps) => {
	const about = aboutData.about;

	return (
		<Layout title='Community | About Us'>
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
					<Heading variant={`title`} marginBottom={`20px`}>
						{about.title}
					</Heading>

					<Box>
						{about.description.map(paragraph => (
							<Box key={paragraph.id} marginBottom={`20px`}>
								<Text variant={`description`}>{paragraph.text}</Text>
							</Box>
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
		</Layout>
	);
};

export default About;
