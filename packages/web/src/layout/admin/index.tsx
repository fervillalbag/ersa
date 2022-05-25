import React from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

import Navbar from '../../components/admin/Navbar';
import Aside from '../../components/admin/Aside';

type LayoutIprops = {
	title?: string;
	showNavbar?: boolean;
	onClick?: () => void;
};

const Layout: React.FC<LayoutIprops> = ({
	children,
	title,
	showNavbar = true,
	onClick,
}) => {
	const router = useRouter();

	return (
		<Grid gridTemplateColumns='250px 1fr 300px' className='scrollbar-hide'>
			<Box display={{ base: 'none', md: 'block' }}>
				{showNavbar ? (
					<Navbar />
				) : (
					<Box padding='2rem 3rem'>
						<Button
							display='block'
							border='1px solid'
							borderColor='dark-blue'
							rounded='4px'
							width='100%'
							onClick={onClick}
							_focus={{ shadow: 0 }}
						>
							<Flex justifyContent='center' alignItems='center'>
								<Text color='dark-blue'>
									<FaArrowLeft />
								</Text>
								<Text color='dark-blue' marginLeft='10px'>
									Volver
								</Text>
							</Flex>
						</Button>
					</Box>
				)}
			</Box>
			<Box
				width={{ base: '100vw', md: 'initial' }}
				backgroundColor='#fff'
				padding={{ base: '0 1rem', md: '0 60px' }}
				minHeight='100vh'
			>
				<Flex
					padding='1.25rem 0'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text
						fontWeight='bold'
						color='#79746C'
						fontSize='28px'
						textTransform={`uppercase`}
					>
						{router.pathname === '/admin' ? 'Hola Fernando!' : title}
					</Text>
				</Flex>
				<Box paddingBottom='4rem'>{children}</Box>
			</Box>
			<Aside />
		</Grid>
	);
};

export default Layout;
