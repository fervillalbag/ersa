import { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Input,
	Text,
	Textarea,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import produce from 'immer';
import { HiPlus, HiOutlineTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';

import { Description, GrowthInterface } from '../../interfaces';
import Layout from '../../layout/admin';
import { getGrowthInfo, updateGrowth } from '../../utils';

type AdminHeaderProps = {
	growthData: GrowthInterface;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const growthData = await getGrowthInfo();

	return {
		props: {
			growthData,
		},
	};
};

const AdminGrowth = ({ growthData }: AdminHeaderProps) => {
	const router = useRouter();

	const [growthInfo, setGrowthInfo] = useState(growthData.growth);
	const [descriptionArray, setDescriptionArray] = useState(
		growthData.growth.description
	);

	const newInputDescription: Description = {
		id: Date.now().toString(),
		text: '',
	};

	const { isOpen, onClose, onOpen } = useDisclosure();

	const handleAddInputDescription = () => {
		setDescriptionArray([...descriptionArray, newInputDescription]);
	};

	const handleDeleteInputDescription = id => {
		setDescriptionArray(description =>
			description.filter(item => item.id !== id)
		);
	};

	const handleUpdateHeaderInfo = async () => {
		if (!growthInfo.title)
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});

		const result = descriptionArray.some(item => item.text === '');

		if (result) {
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});
		}

		const data = {
			title: growthInfo.title,
			description: descriptionArray,
		};

		const response = await updateGrowth(data, growthInfo._id);

		if (response.success) {
			onClose();
			router.push('/admin');
			return toast.success('Actualizado correctamente');
		}

		onClose();
		router.push('/admin');
		return toast.error('Hubo un problema al actualizar');
	};

	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val.text === b[index].text)
		);
	}

	const arraysEquals = arrayEquals(growthInfo.description, descriptionArray);

	return (
		<Layout title='Header'>
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
							onClick={handleUpdateHeaderInfo}
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
						Título
					</Text>
					<Input
						id='title'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						value={growthInfo.title}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e =>
							setGrowthInfo({ ...growthInfo, title: e.target.value })
						}
					/>
				</Box>

				<Box>
					<Text
						as='label'
						display='block'
						htmlFor='title'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Descripción
					</Text>

					{descriptionArray.map((item, index) => (
						<Flex marginBottom='1rem' key={item.id}>
							<Textarea
								id='title'
								borderColor='#9F9A93'
								paddingLeft='0.75rem'
								borderRadius={`3px`}
								height={`8rem`}
								_focus={{ borderColor: '#79746C', outline: 'none' }}
								resize='none'
								value={item.text}
								onChange={e => {
									const text = e.target.value;
									setDescriptionArray(currentDescription =>
										produce(currentDescription, v => {
											v[index].text = text;
										})
									);
								}}
							/>
							<Flex>
								<Button
									minWidth='initial'
									height='auto'
									border='1px solid #9F9A93'
									marginLeft='0.75rem'
									backgroundColor='#fff'
									color='#9F9A93'
									fontSize='1.2rem'
									borderRadius={`3px`}
									_focus={{ shadow: 0 }}
									_hover={{ backgroundColor: `#fff` }}
									_active={{ backgroundColor: `#fff` }}
									onClick={handleAddInputDescription}
								>
									<HiPlus />
								</Button>

								<Button
									minWidth='initial'
									height='auto'
									marginLeft='0.75rem'
									backgroundColor='#9F9A93'
									color='#F8F5ED'
									fontSize='1.2rem'
									borderRadius={`3px`}
									_hover={{ backgroundColor: `#9F9A93` }}
									_active={{ backgroundColor: `#9F9A93` }}
									_focus={{ shadow: 0 }}
									onClick={() => handleDeleteInputDescription(item.id)}
								>
									<HiOutlineTrash />
								</Button>
							</Flex>
						</Flex>
					))}
				</Box>

				<Button
					backgroundColor={
						growthInfo.title !== growthData.growth.title || !arraysEquals
							? '#9F9A93'
							: '#cfcdc9'
					}
					cursor={
						growthInfo.title !== growthData.growth.title || !arraysEquals
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
						growthInfo.title !== growthData.growth.title || !arraysEquals
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

export default AdminGrowth;
