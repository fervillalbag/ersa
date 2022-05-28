import { useEffect, useRef, useState } from 'react';
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
	Image,
} from '@chakra-ui/react';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { HiOutlineChevronLeft, HiOutlineTrash, HiPlus } from 'react-icons/hi';

import { useImage } from '../../../hooks/useImage';
// import { Description, FileType, ReviewType } from '../../../interfaces';
import { Description, FileType } from '../../../interfaces';
import Layout from '../../../layout/admin';
import { createReview } from '../../../utils';

const AdminReviewItem = () => {
	const router = useRouter();

	const [name, setName] = useState<string>('');
	const [order, setOrder] = useState<number>(0);
	const [descriptionArray, setDescriptionArray] = useState([
		{
			id: uuidv4(),
			text: '',
		},
	]);

	const [image, setImage] = useState<string | null>(null);
	const [fileImage, setFileImage] = useState<FileType | string | Blob>();
	const inputImgRef = useRef(null);

	const { isOpen, onClose, onOpen } = useDisclosure();

	const newInputDescription: Description = {
		id: Date.now().toString(),
		text: '',
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget as HTMLInputElement;
		const file = target.files[0];
		const image = URL.createObjectURL(file);
		setImage(image);
		setFileImage(file);
	};

	useEffect(() => {
		setImage(null);
		setFileImage(null);
	}, []);

	const handleAddInputDescription = () => {
		setDescriptionArray([...descriptionArray, newInputDescription]);
	};

	const handleDeleteInputDescription = id => {
		setDescriptionArray(description =>
			description.filter(item => item.id !== id)
		);
	};

	const handleUpdateReviewItem = async () => {
		if (!name || order < 0 || !image)
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
			const responseImage = await useImage(fileImage as string);

			const data = {
				name,
				avatar: responseImage,
				order,
				description: descriptionArray,
			};

			const response = await createReview(data);

			if (response.success) {
				onClose();
				router.push('/admin/reviews');
				return toast.success('Actualizado correctamente');
			}

			onClose();
			router.push('/admin/reviews');
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
							onClick={handleUpdateReviewItem}
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
					onClick={() => router.push('/admin/reviews')}
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

				<Box marginTop='25px'>
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
						value={name}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e => setName(e.target.value)}
					/>
				</Box>

				<Box marginTop={`25px`}>
					<Image
						src={image}
						alt={name || ''}
						width='10rem'
						height='10rem'
						objectFit='cover'
						border='1px solid #D9D9D9'
						rounded='4px'
						padding='0.5rem'
					/>
				</Box>

				<Box marginTop={`25px`}>
					<Button
						backgroundColor='transparent'
						borderRadius={`3px`}
						height={`50px`}
						minWidth={`initial`}
						padding={`0 28px`}
						border='1px solid #9F9A93'
						onClick={() => inputImgRef.current.click()}
						_focus={{ shadow: 0 }}
						color='#79746C'
						fontWeight={`normal`}
						_hover={{ backgroundColor: `#FFF` }}
						_active={{ backgroundColor: `#FFF` }}
					>
						Cambiar imagen
					</Button>
					<Input
						ref={inputImgRef}
						type='file'
						onChange={handleChangeImage}
						display='none'
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
						name || order > 0 || image ? '#9F9A93' : 'hsl(35, 6%, 80%)'
					}
					cursor={name || order > 0 || image ? 'pointer' : 'not-allowed'}
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
					onClick={() => (name || order > 0 || image ? onOpen() : null)}
				>
					Actualizar
				</Button>
			</Box>
		</Layout>
	);
};

export default AdminReviewItem;
