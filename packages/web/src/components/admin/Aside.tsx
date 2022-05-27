import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Grid, Image, Text, Link, Button } from '@chakra-ui/react';

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

const Aside: React.FC = () => {
	return (
		<Box height={`100vh`} position={`relative`}>
			<Box
				width={{ base: '0', md: '300px' }}
				height='full'
				position='fixed'
				overflowY='auto'
				borderLeft={`1px solid #79746C`}
				backgroundColor={`#F8F5ED`}
			>
				<Flex
					padding={`30px`}
					alignItems={`center`}
					justifyContent={`center`}
					borderBottom={`1px solid #79746C`}
				>
					<Text color={`#79746C`} fontSize={`20px`} textAlign={`center`}>
						Lunes, 20 de mayo
					</Text>
				</Flex>

				<Box padding={`30px`} borderBottom={`1px solid #79746C`}>
					<Grid placeItems={`center`}>
						<Image
							src='https://images.unsplash.com/photo-1589254065909-b7086229d08c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774'
							width={`100px`}
							height={`100px`}
							objectFit={`cover`}
							borderRadius={`50%`}
							alt=''
						/>
					</Grid>
					<Box marginTop={`10px`}>
						<Text
							fontWeight={`semibold`}
							color={`#494130`}
							textAlign={`center`}
						>
							Lucas Lamas
						</Text>
						<Text color={`#79746C`} fontSize={`14px`} textAlign={`center`}>
							lucaslamas@gmail.com
						</Text>
					</Box>
				</Box>

				<Box>
					<Box
						as='article'
						borderBottom={`1px solid #79746C`}
						paddingBottom={`30px`}
					>
						<Text
							fontSize={`20px`}
							marginTop={`25px`}
							marginBottom={`10px`}
							padding={`0 40px`}
							color={`#494130`}
						>
							Configuración
						</Text>

						<NavLinkAdmin
							path={`/admin/settings/user`}
							name={`Ajustes de perfil`}
						/>
						<NavLinkAdmin path={`/admin/support`} name={`Ayuda y soporte`} />
						<NavLinkAdmin path={`/admin/reviews`} name={`Ir al sitio web`} />
					</Box>
				</Box>

				<Box padding={`30px`}>
					<Button
						minWidth={`initial`}
						height={`auto`}
						color={`#494130`}
						fontSize={`18px`}
						textTransform={`uppercase`}
						padding={`0`}
						fontWeight={`bold`}
						backgroundColor={`transparent`}
						_hover={{ backgroundColor: `transparent` }}
						_focus={{ outline: '0' }}
						_active={{ backgroundColor: `transparent` }}
					>
						Cerrar sesión
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Aside;
