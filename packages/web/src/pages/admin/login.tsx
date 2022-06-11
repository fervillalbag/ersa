import { Box, Button, Flex, Grid, Image, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { loginUser } from '../../utils/user';

const Login = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginUser = async e => {
		e.preventDefault();

		if (!email || !password) {
			return toast.error('Todos los campos son obligatorios');
		}

		const data = { email, password };

		const response = await loginUser(data);

		if (!response) {
			return toast.error('Ocurrió un error al iniciar sesión');
		}

		localStorage.setItem('ERSA_TOKEN_AUTH', response.token);
		toast.success('Sesión iniciada correctamente');
		router.push('/admin');
	};

	return (
		<Box height={`100vh`} overflow={`hidden`}>
			<Grid
				gridTemplateColumns={{ base: `1fr`, md: `1fr 400px` }}
				gridTemplateRows={{ base: `30vh 70vh`, md: `1fr` }}
				height={`100%`}
			>
				<Box backgroundColor={`blue`} height={{ base: `auto`, md: `100vh` }}>
					<Image
						src={`/login-bg.jpeg`}
						alt='Fondo'
						width={`100%`}
						height={`100%`}
						objectFit={`cover`}
					/>
				</Box>
				<Flex
					height={{ base: `auto`, md: `100vh` }}
					padding={{ base: `50px 20px`, md: `0 30px` }}
					flexDirection={`column`}
					justifyContent={{ base: `flex-start`, md: `center` }}
				>
					<Grid placeItems={`center`} marginBottom={`20px`}>
						<Image src={`/logo.svg`} alt='' />
					</Grid>
					<Box as='form' onSubmit={handleLoginUser}>
						<Input
							type={`email`}
							display={`block`}
							width={`100%`}
							borderRadius={`3px`}
							_focus={{ shadow: 0 }}
							height={`45px`}
							color={`gray.800`}
							marginBottom={`15px`}
							placeholder={`Correo`}
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Input
							type={`password`}
							display={`block`}
							width={`100%`}
							borderRadius={`3px`}
							_focus={{ shadow: 0 }}
							height={`45px`}
							color={`gray.800`}
							placeholder={`Contraseña`}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>

						<Button
							type={`submit`}
							backgroundColor={`#f3603c`}
							borderRadius={`3px`}
							width={`100%`}
							marginTop={`20px`}
							height={`45px`}
							color={`#fff`}
						>
							Ingresar
						</Button>
					</Box>
				</Flex>
			</Grid>
		</Box>
	);
};

export default Login;
