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
import produce from 'immer';
import { useRouter } from 'next/router';
import { HiOutlineChevronLeft, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

// import { Description, ValueType } from '../../../interfaces';
import { Description } from '../../../interfaces';
import Layout from '../../../layout/admin';
// import { updateValue } from '../../../utils';
import toast from 'react-hot-toast';
import { createValue } from '../../../utils';

const AdminValueItem = () => {
	const router = useRouter();

	const [title, setTitle] = useState<string>('');
	const [order, setOrder] = useState<number>(0);
	const [descriptionArray, setDescriptionArray] = useState([
		{ id: uuidv4(), text: '' },
	]);

	const { isOpen, onClose, onOpen } = useDisclosure();

	const newInputDescription: Description = {
		id: uuidv4(),
		text: '',
	};

	const handleAddInputDescription = () => {
		setDescriptionArray([...descriptionArray, newInputDescription]);
	};

	const handleDeleteInputDescription = id => {
		setDescriptionArray(description =>
			description.filter(item => item.id !== id)
		);
	};

	const handleUpdateValueItem = async () => {
		if (!title || order <= 0)
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});

		const result = descriptionArray.some(item => item.text === '');

		if (result) {
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});
		}

		try {
			const data = {
				title,
				order,
				description: descriptionArray,
			};

			const response = await createValue(data);

			if (response.success) {
				onClose();
				router.push('/admin/values');
				return toast.success('Creado correctamente');
			}

			onClose();
			router.push('/admin/values');
			return toast.error('Hubo un problema al actualizar');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent borderRadius={`3px`}>
					<ModalHeader color='#79746C'>
						¿Desea crear un nuevo valor?
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
							_hover={{ backgroundColor: `#FFF` }}
							onClick={onClose}
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
							onClick={handleUpdateValueItem}
						>
							Confirmar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box>
				<Button
					display={`flex`}
					alignItems={`center`}
					minWidth='initial'
					height='45px'
					padding={`0 20px`}
					backgroundColor='#9F9A93'
					color='#F8F5ED'
					borderRadius={`3px`}
					_focus={{ shadow: 0 }}
					_hover={{ backgroundColor: `#9F9A93` }}
					onClick={() => router.push('/admin/values')}
				>
					<Text fontSize={`18px`}>
						<HiOutlineChevronLeft />
					</Text>
					<Text fontSize={`14px`} marginLeft={`5px`} fontWeight={`regular`}>
						Volver
					</Text>
				</Button>

				<Box marginTop={`25px`}>
					<Text
						as='label'
						display='block'
						htmlFor='order'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Orden
					</Text>
					<Input
						type={`number`}
						width={`60px`}
						textAlign={`center`}
						id='order'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						value={order}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e => setOrder(Number(e.target.value))}
					/>
				</Box>

				<Box marginTop={`25px`}>
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
							value={title}
							borderRadius={`3px`}
							_focus={{ borderColor: '#79746C', outline: 'none' }}
							onChange={e => setTitle(e.target.value)}
						/>
					</Box>

					<Box marginTop={`25px`}>
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
										_hover={{ backgroundColor: `#FFF` }}
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
										_focus={{ shadow: 0 }}
										_hover={{ backgroundColor: `#9F9A93` }}
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
							title || order > 0 ? '#9F9A93' : 'hsl(35, 6%, 80%)'
						}
						cursor={title || order > 0 ? 'pointer' : 'not-allowed'}
						marginTop='10px'
						borderRadius='3px'
						minWidth={`initial`}
						height={`50px`}
						padding={`0 32px`}
						color='#fff'
						fontWeight='normal'
						_focus={{ outline: 'none' }}
						_active={{ backgroundColor: `hsl(35, 6%, 80%)` }}
						_hover={{ backgroundColor: `hsl(35, 6%, 80%)` }}
						onClick={() => (title || order > 0 ? onOpen() : null)}
					>
						Crear
					</Button>
				</Box>
			</Box>
		</Layout>
	);
};

export default AdminValueItem;
