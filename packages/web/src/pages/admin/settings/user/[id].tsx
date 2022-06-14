import { useState } from 'react';
import toast from 'react-hot-toast';
import {
	Box,
	Button,
	Input,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import Layout from '../../../../layout/admin';
import { getUser, updateUser } from '../../../../utils/user';
import { useRouter } from 'next/router';
import { UserAuth } from '../../../../hooks/useAuth';
import { UserResponse } from '../../../../interfaces/User';

type SettingsUserProps = {
	user: UserResponse;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const user = await getUser(context.params.id as string);

	return {
		props: {
			user,
		},
	};
};

const UserSettings = ({ user }: SettingsUserProps) => {
	const router = useRouter();
	const { user: userInfo } = user;
	const { logout } = UserAuth();

	const { onOpen, onClose, isOpen } = useDisclosure();

	const [name, setName] = useState<string>(userInfo.name);
	const [email, setEmail] = useState<string>(userInfo.email);
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const handleUpdateUser = async () => {
		if (!name || !email) {
			return toast.error('Todos los campos son obligatarios');
		}

		if (newPassword && !confirmPassword) {
			return toast.error('Las contraseñas no son válidas');
		}

		const password = newPassword.length === 0 ? userInfo.password : newPassword;

		const data = {
			name,
			email,
			password,
		};

		const response = await updateUser(userInfo._id, data);

		if (response.success) {
			toast.success('Información actualizada');

			if (newPassword) {
				return router.push('/admin/login');
				logout();
			}

			return router.push('/admin');
		}

		toast.error('Hubo un problema al actualizar');
	};

	return (
		<Layout title='Ajustes de perfil'>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent borderRadius={`3px`}>
					<ModalHeader color='#79746C'>
						¿Desea actualizar la información?
					</ModalHeader>
					<ModalBody marginTop={`-12px`}>
						Confirmar si estás de acuerdo en realizar los cambios
					</ModalBody>

					<ModalFooter>
						<Button
							minWidth='initial'
							height='45px'
							padding={`0 32px`}
							border='1px solid #9F9A93'
							marginLeft='0.75rem'
							backgroundColor='#fff'
							color='#9F9A93'
							borderRadius={`3px`}
							_focus={{ shadow: 0 }}
							onClick={onClose}
							_hover={{ backgroundColor: `#FFF` }}
							_active={{ backgroundColor: `#FFF` }}
						>
							Cerrar
						</Button>

						<Button
							minWidth='initial'
							height='45px'
							padding={`0 32px`}
							marginLeft='0.75rem'
							backgroundColor='#9F9A93'
							color='#F8F5ED'
							borderRadius={`3px`}
							_focus={{ shadow: 0 }}
							_hover={{ backgroundColor: `#9F9A93` }}
							_active={{ backgroundColor: `#9F9A93` }}
							onClick={handleUpdateUser}
						>
							Confirmar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box>
				<Box marginBottom='1.5rem'>
					<Text
						as='label'
						display='block'
						htmlFor='title'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Nombre
					</Text>
					<Input
						id='title'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</Box>
				<Box marginBottom='1.5rem'>
					<Text
						as='label'
						display='block'
						htmlFor='email'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Email
					</Text>
					<Input
						id='email'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</Box>
				<Box marginBottom='1.5rem'>
					<Text
						as='label'
						display='block'
						htmlFor='password'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Nueva contraseña
					</Text>
					<Input
						type='password'
						id='password'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
					/>
				</Box>
				<Box marginBottom='1.5rem'>
					<Text
						as='label'
						display='block'
						htmlFor='newPassword'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Confirmar contraseña
					</Text>
					<Input
						type='password'
						id='newPassword'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</Box>
				<Button
					backgroundColor={
						name !== userInfo.name ||
						email !== userInfo.email ||
						(newPassword && confirmPassword && newPassword === confirmPassword)
							? '#9F9A93'
							: '#cfcdc9'
					}
					cursor={
						name !== userInfo.name ||
						email !== userInfo.email ||
						(newPassword && confirmPassword && newPassword === confirmPassword)
							? 'pointer'
							: 'not-allowed'
					}
					marginTop='10px'
					borderRadius='3px'
					minWidth={`initial`}
					height={`50px`}
					padding={`0 32px`}
					color='#fff'
					fontWeight='normal'
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#cfcdc9` }}
					_active={{ backgroundColor: `#cfcdc9` }}
					onClick={() =>
						name !== userInfo.name ||
						email !== userInfo.email ||
						(newPassword && confirmPassword && newPassword === confirmPassword)
							? onOpen()
							: null
					}
				>
					Actualizar
				</Button>
			</Box>
		</Layout>
	);
};

export default UserSettings;
