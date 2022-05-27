import {
	Box,
	Button,
	Flex,
	Image,
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
import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import { HiPlus, HiOutlineTrash } from 'react-icons/hi';

import { HeaderInterface, Description, FileType } from '../../interfaces';
import Layout from '../../layout/admin';
import { getHeaderInfo, updateHeader } from '../../utils';
import { useImage } from '../../hooks/useImage';
import toast from 'react-hot-toast';

type AdminHeaderProps = {
	headerData: HeaderInterface;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const headerData = await getHeaderInfo();

	return {
		props: {
			headerData,
		},
	};
};

const AdminHeader = ({ headerData }: AdminHeaderProps) => {
	const [headerInfo, setHeaderInfo] = useState(headerData.header);
	const [descriptionArray, setDescriptionArray] = useState(
		headerData.header.description
	);

	const [imageExist, setImageExist] = useState(headerData.header.image);
	const [image, setImage] = useState<string | null>(null);
	const [fileImage, setFileImage] = useState<FileType | string | Blob>();
	const inputImgRef = useRef(null);

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

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget as HTMLInputElement;
		const file = target.files[0];
		const image = URL.createObjectURL(file);
		setImage(image);
		setImageExist(image);
		setFileImage(file);
	};

	useEffect(() => {
		setImage(null);
		setFileImage(null);
	}, []);

	const handleUpdateHeaderInfo = async () => {
		if (!headerInfo.title) return;

		const data = {
			title: headerInfo.title,
			image: image || headerInfo.image,
			description: descriptionArray,
		};

		if (image) {
			const responseImage = await useImage(fileImage as string);

			const data = {
				title: headerInfo.title,
				image: responseImage,
				description: descriptionArray,
			};

			const response = await updateHeader(data, headerInfo._id);

			if (response.success) {
				onClose();
				return toast.success('Actualizado correctamente');
			}

			onClose();
			return toast.error('Hubo un problema al actualizar');
		}

		const response = await updateHeader(data, headerInfo._id);

		if (response.success) {
			onClose();
			return toast.success('Actualizado correctamente');
		}

		onClose();
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

	const arraysEquals = arrayEquals(headerInfo.description, descriptionArray);

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
						value={headerInfo.title}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e =>
							setHeaderInfo({ ...headerInfo, title: e.target.value })
						}
					/>
				</Box>

				<Box marginBottom='1rem'>
					<Image
						src={image || headerInfo.image}
						alt={headerInfo.title}
						width='10rem'
						height='10rem'
						objectFit='cover'
						border='1px solid #D9D9D9'
						rounded='4px'
						padding='0.5rem'
					/>
				</Box>

				<Box marginBottom='1.5rem'>
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
						headerInfo.title !== headerData.header.title ||
						!arraysEquals ||
						imageExist !== headerData.header.image
							? '#9F9A93'
							: 'hsl(35, 6%, 80%)'
					}
					cursor={
						headerInfo.title !== headerData.header.title ||
						!arraysEquals ||
						imageExist !== headerData.header.image
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
					onClick={() =>
						headerInfo.title !== headerData.header.title ||
						!arraysEquals ||
						imageExist !== headerData.header.image
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

export default AdminHeader;
