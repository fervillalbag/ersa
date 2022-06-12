import NextLink from 'next/link';
import {
	Box,
	Grid,
	Heading,
	Image,
	Link,
	Text,
	Flex,
	Button,
} from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Layout from '../layout';
// import Animation from '../components/Animation';
import { getHeaderInfo, getGrowthInfo, getValues, getReviews } from '../utils';
import {
	HeaderInterface,
	GrowthInterface,
	ValueInterface,
	ReviewInterface,
} from '../interfaces/';

type HomeProps = {
	headerData: HeaderInterface;
	growthData: GrowthInterface;
	valuesData: ValueInterface;
	reviewsData: ReviewInterface;
};

export const getStaticProps = async () => {
	const headerData = await getHeaderInfo();
	const growthData = await getGrowthInfo();
	const valuesData = await getValues();
	const reviewsData = await getReviews();

	return {
		props: {
			headerData,
			growthData,
			valuesData,
			reviewsData,
		},
	};
};

const Home = ({
	headerData,
	growthData,
	valuesData,
	reviewsData,
}: HomeProps) => {
	const growth = growthData.growth;
	const header = headerData.header;
	const values = valuesData.values;
	const reviews = reviewsData.reviews;

	return (
		<Layout title='Home Page'>
			{/* <Animation> */}
			<Grid
				gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				maxWidth='1170px'
				width='90%'
				margin='0 auto'
				padding='2rem 0 4rem 0'
				alignItems='center'
				gap='2rem 4rem'
				position='relative'
				_before={{
					content: `''`,
					display: 'block',
					width: { base: '20rem', md: '30rem' },
					height: { base: '25rem', md: '60rem' },
					position: 'absolute',
					right: { base: 0, md: -100 },
					bottom: { base: 440, md: 0 },
					backgroundColor: 'hsl(13, 100%, 96%)',
					borderRadius: '30rem',
					zIndex: -100,
					transform: 'rotate(40deg)',
				}}
			>
				<Box order={{ base: '2', lg: 'initial' }}>
					<Heading variant={`large`}>{header.title}</Heading>

					<Box marginTop={`15px`}>
						{header.description.map(item => (
							<Text
								key={item.id}
								variant={`description`}
								maxW={{ base: '100%', lg: '65%' }}
							>
								{item.text}
							</Text>
						))}
					</Box>

					<NextLink href='/' passHref>
						<Button variant={`primary`} marginTop={`15px`}>
							<Link _hover={{ textDecoration: 'none' }}>Get Started</Link>
						</Button>
					</NextLink>
				</Box>
				<Box>
					<LazyLoadImage src={header.image} width='100%' alt='' effect='blur' />
				</Box>
			</Grid>

			<Grid
				gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				maxWidth='1170px'
				margin='0 auto'
				width='90%'
				padding={{ base: '3rem 0 6rem 0', lg: '2rem 0 6rem 0' }}
				gap='3rem'
			>
				<Box>
					<Heading variant={`title`}>{growth.title}</Heading>

					<Box marginTop={`15px`}>
						{growth.description.map(item => (
							<Text
								key={item.id}
								variant={`description`}
								maxW={{ base: '100%', lg: '65%' }}
							>
								{item.text}
							</Text>
						))}
					</Box>
				</Box>

				<Box>
					{values.map((item, index) => (
						<Grid
							key={item._id}
							gridTemplateColumns='70px 1fr'
							gridTemplateRows='repeat(2, auto)'
							gap='0.5rem 1rem'
							marginBottom='2rem'
						>
							<Box gridColumn='1/2'>
								<Button variant={`dots`}>0{index + 1}</Button>
							</Box>
							<Box gridColumn='2/3' alignSelf='center'>
								<Heading variant={`secondary`}>{item.title}</Heading>
							</Box>
							<Box gridColumn={{ base: '1/3', lg: '2/3' }} gridRow='2/3'>
								{item.description.map(item => (
									<Text key={item.id} variant={`description`}>
										{item.text}
									</Text>
								))}
							</Box>
						</Grid>
					))}
				</Box>
			</Grid>
			{/* </Animation> */}

			<Box paddingBottom={`6rem`} maxWidth='1170px' margin='0 auto' width='90%'>
				<Box marginBottom='5rem'>
					<Heading variant={`title`} textAlign={`center`}>
						What they’ve said
					</Heading>
				</Box>

				<Grid
					gridTemplateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
					}}
					gap='5rem 3rem'
					marginTop='4rem'
				>
					{reviews.map(review => (
						<Box
							key={review._id}
							backgroundColor='gray.100'
							padding='1.5rem'
							rounded='md'
						>
							<Grid marginTop='-4rem' placeItems='center'>
								<Image src={review.avatar} alt='' width='100px' />
							</Grid>
							<Box marginTop='1rem'>
								<Text
									fontWeight='bold'
									color='dark-blue'
									textAlign='center'
									marginBottom='0.7rem'
									fontSize='1.125rem'
								>
									{review.name}
								</Text>
								{review.description.map(item => (
									<Text
										key={item.id}
										variant={`description`}
										textAlign='center'
									>
										{item.text}
									</Text>
								))}
							</Box>
						</Box>
					))}
				</Grid>
			</Box>

			<Box
				backgroundColor='bright-red'
				padding='3rem 0'
				position='relative'
				overflow='hidden'
			>
				<Box position='absolute' top={0} left={0}>
					<Image
						src='/bg-simplify-section-desktop.svg'
						width='100%'
						height='100%'
						objectFit='cover'
						alt=''
					/>
				</Box>

				<Flex
					maxWidth='1170px'
					margin='0 auto'
					width='90%'
					justifyContent={{ base: 'flex-start', lg: 'space-between' }}
					alignItems='center'
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<Box flex='1'>
						<Text
							fontSize={{ base: '2.2rem', lg: '2.8rem' }}
							fontWeight='bold'
							color='white'
							lineHeight={1.2}
							textAlign={{ base: 'center', lg: 'left' }}
						>
							Simplify how your team works today.
						</Text>
					</Box>
					<Flex
						flex='1'
						justifyContent='flex-end'
						marginTop={{ base: '1rem', lg: '0' }}
					>
						<NextLink href='/' passHref>
							<Button
								variant={`primary`}
								bgColor={`white`}
								color={`bright-red`}
								_hover={{ bgColor: '#f2f2f2' }}
								_active={{ bgColor: '#fff' }}
							>
								<Link _hover={{ textDecoration: 'none' }}>Get Started</Link>
							</Button>
						</NextLink>
					</Flex>
				</Flex>
			</Box>
		</Layout>
	);
};

export default Home;
