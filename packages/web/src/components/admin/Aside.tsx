import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Grid, Image, Text, Link, Button } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { UserAuth } from '../../hooks/useAuth';

import 'dayjs/locale/es';
import toast from 'react-hot-toast';
dayjs.locale('es');

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
	const { user, logout } = UserAuth();
	const router = useRouter();

	const currentDate = dayjs(new Date()).format('dddd, DD MMMM');

	const handleLogout = () => {
		logout();
		toast.success('Sesión cerrada!');
		router.push('/admin/login');
	};

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
					<Text
						color={`#79746C`}
						fontSize={`20px`}
						textAlign={`center`}
						textTransform={`capitalize`}
					>
						{currentDate}
					</Text>
				</Flex>

				<Box padding={`30px`} borderBottom={`1px solid #79746C`}>
					<Grid placeItems={`center`}>
						<Image
							src='/profile.avif'
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
							{user?.name}
						</Text>
						<Text color={`#79746C`} fontSize={`14px`} textAlign={`center`}>
							{user?.email}
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
							path={`/admin/settings/user/${user?._id}`}
							name={`Ajustes de perfil`}
						/>
						<NavLinkAdmin
							path={`/admin/settings/support`}
							name={`Ayuda y soporte`}
						/>

						<Link
							target={`_blank`}
							href={`https://ersa.fervillalbag.com`}
							display={`block`}
							padding='10px 40px'
							color={'#9F9A93'}
							_focus={{ outline: 0 }}
							_hover={{
								textDecoration: 'none',
								color: `#494130`,
							}}
						>
							Ir al sitio web
						</Link>
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
						onClick={handleLogout}
					>
						Cerrar sesión
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Aside;
