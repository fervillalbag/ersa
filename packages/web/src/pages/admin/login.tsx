import { Box, Button, Flex, Grid, Image, Input } from '@chakra-ui/react';

const Login = () => {
	return (
		<Box height={`100vh`}>
			<Grid gridTemplateColumns={`1fr 400px`} height={`100%`}>
				<Box backgroundColor={`blue`}>
					<Image
						src={`/login-bg.jpeg`}
						alt='Fondo'
						width={`100%`}
						height={`100%`}
						objectFit={`cover`}
					/>
				</Box>
				<Flex
					padding={`0 30px`}
					flexDirection={`column`}
					justifyContent={`center`}
				>
					<Grid placeItems={`center`} marginBottom={`20px`}>
						<Image src={`/logo.svg`} alt='' />
					</Grid>
					<Box>
						<Input
							display={`block`}
							width={`100%`}
							borderRadius={`3px`}
							_focus={{ shadow: 0 }}
							height={`45px`}
							marginBottom={`20px`}
							placeholder={`Correo`}
						/>
						<Input
							display={`block`}
							width={`100%`}
							borderRadius={`3px`}
							_focus={{ shadow: 0 }}
							height={`45px`}
							placeholder={`Contraseña`}
						/>

						<Button
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
