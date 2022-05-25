import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Link, Grid } from '@chakra-ui/react';

type NavLinkAdminProps = {
	path: string;
	name: string;
};

const NavLinkAdmin = ({ path, name }: NavLinkAdminProps) => {
	const router = useRouter();

	return (
		<NextLink href={path}>
			<Link
				display={`block`}
				padding='10px 40px'
				color={router.pathname === path ? '#494130' : '#9F9A93'}
				_hover={{
					textDecoration: 'none',
					color: `#494130`,
				}}
			>
				<Text as='span' display='block' color='inherit'>
					{name}
				</Text>
			</Link>
		</NextLink>
	);
};

const Navbar: React.FC = () => {
	const router = useRouter();

	return (
		<Box height='100vh' position='relative'>
			<Box
				width={{ base: '0', md: '250px' }}
				height='full'
				position='fixed'
				overflowY='auto'
				borderRight={`1px solid #79746C`}
				backgroundColor={`#F8F5ED`}
			>
				<Flex padding='40px'>
					<Grid
						gridTemplateColumns={`repeat(2, 10px)`}
						gap={`15px`}
						cursor={`pointer`}
						onClick={() => router.push('/admin')}
					>
						<Box
							width={`10px`}
							height={`10px`}
							backgroundColor={`#494130`}
						></Box>
						<Box
							width={`10px`}
							height={`10px`}
							backgroundColor={`#494130`}
						></Box>
						<Box
							width={`10px`}
							height={`10px`}
							backgroundColor={`#494130`}
						></Box>
						<Box
							width={`10px`}
							height={`10px`}
							backgroundColor={`#494130`}
						></Box>
					</Grid>
				</Flex>

				<Box>
					<Box
						as='article'
						borderTop={`1px solid #79746C`}
						marginBottom={`25px`}
					>
						<Text
							fontSize={`20px`}
							marginTop={`25px`}
							marginBottom={`10px`}
							padding={`0 40px`}
							color={`#494130`}
						>
							Inicio
						</Text>

						<NavLinkAdmin path={`/admin/header`} name={`Encabezado`} />
						<NavLinkAdmin path={`/admin/values`} name={`Valores`} />
						<NavLinkAdmin
							path={`/admin/reviews`}
							name={`Reseñas de usuarios`}
						/>
					</Box>

					<Box
						as='article'
						borderTop={`1px solid #79746C`}
						marginBottom={`25px`}
					>
						<Text
							fontSize={`20px`}
							marginTop={`25px`}
							marginBottom={`10px`}
							padding={`0 40px`}
							color={`#494130`}
						>
							Nosotros
						</Text>

						<NavLinkAdmin path={`/admin/about`} name={`Empresa`} />
					</Box>

					<Box
						as='article'
						borderTop={`1px solid #79746C`}
						marginBottom={`25px`}
					>
						<Text
							fontSize={`20px`}
							marginTop={`25px`}
							marginBottom={`10px`}
							padding={`0 40px`}
							color={`#494130`}
						>
							Productos
						</Text>

						<NavLinkAdmin path={`/admin/product`} name={`Lista de productos`} />
					</Box>

					<Box
						as='article'
						borderTop={`1px solid #79746C`}
						marginBottom={`25px`}
					>
						<Text
							fontSize={`20px`}
							marginTop={`25px`}
							marginBottom={`10px`}
							padding={`0 40px`}
							color={`#494130`}
						>
							Comunidad
						</Text>

						<NavLinkAdmin path={`/admin/banners`} name={`Banners`} />
						<NavLinkAdmin path={`/admin/community`} name={`Información`} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Navbar;
