import {
	Box,
	Button,
	Flex,
	Grid,
	Image,
	Input,
	Switch,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
	Textarea,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import Layout from '../../../layout/admin';
import { Description, FileType, ProductType } from '../../../interfaces';
import { getProduct, updateProduct } from '../../../utils';
import { HiOutlineChevronLeft, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useImage } from '../../../hooks/useImage';
import produce from 'immer';

export type AdminProductItemProps = {
	product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const product = await getProduct(context.params.id as string);

	return {
		props: {
			product: product.product,
		},
	};
};

const AdminProductItem = ({ product }: AdminProductItemProps) => {
	console.log(product);

	const [productInfo, setProductInfo] = useState(product);
	const [descriptionArray, setDescriptionArray] = useState(product.description);

	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [statusValue, setStatusValue] = useState<boolean>(false);

	const [imageExist, setImageExist] = useState(productInfo.image);
	const [image, setImage] = useState<string | null>(null);
	const [fileImage, setFileImage] = useState<FileType | string | Blob>();
	const inputImgRef = useRef(null);

	const newInputDescription: Description = {
		id: Date.now().toString(),
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
		setImageExist(product.image);
	}, []);

	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val.text === b[index].text)
		);
	}

	const arraysEquals = arrayEquals(product.description, descriptionArray);

	const handleUpdateProductItem = async () => {
		if (!productInfo.name || productInfo.category || !imageExist)
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
			const data = {};

			if (image) {
				const responseImage = await useImage(fileImage as string);

				const data = {
					image: responseImage,
				};

				const response = await updateProduct(data, product._id);

				if (response.success) {
					onClose();
					router.push('/admin/reviews');
					return toast.success('Actualizado correctamente');
				}

				onClose();
				router.push('/admin/reviews');
				return toast.error('Hubo un problema al actualizar');
			}

			const response = await updateProduct(data, product._id);

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
							onClick={handleUpdateProductItem}
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
						Nombre
					</Text>
					<Input
						type={`number`}
						width={`100%`}
						id='order'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={productInfo.name}
						onChange={e =>
							setProductInfo({ ...productInfo, name: e.target.value })
						}
					/>
				</Box>

				<Grid
					marginTop={`25px`}
					gridTemplateColumns={{ base: `1fr`, md: `repeat(2, 1fr)` }}
					gap={`10px 20px`}
				>
					<Box>
						<Text
							as='label'
							display='block'
							htmlFor='order'
							fontSize={`18px`}
							color='#79746C'
							textTransform='uppercase'
							marginBottom='10px'
						>
							Cantidad
						</Text>
						<Input
							type={`number`}
							width={`100%`}
							id='order'
							height={`50px`}
							borderColor='#9F9A93'
							paddingLeft='0.75rem'
							borderRadius={`3px`}
							_focus={{ borderColor: '#79746C', outline: 'none' }}
							// value={valueInfo.order}
							// onChange={e =>
							// 	setValueInfo({ ...valueInfo, order: Number(e.target.value) })
							// }
						/>
					</Box>
					<Box>
						<Text
							as='label'
							display='block'
							htmlFor='order'
							fontSize={`18px`}
							color='#79746C'
							textTransform='uppercase'
							marginBottom='10px'
						>
							Categoría
						</Text>
						<Input
							type={`number`}
							width={`100%`}
							id='order'
							height={`50px`}
							borderColor='#9F9A93'
							paddingLeft='0.75rem'
							borderRadius={`3px`}
							_focus={{ borderColor: '#79746C', outline: 'none' }}
							// value={valueInfo.order}
							// onChange={e =>
							// 	setValueInfo({ ...valueInfo, order: Number(e.target.value) })
							// }
						/>
					</Box>
				</Grid>

				<Grid
					marginTop={`25px`}
					gridTemplateColumns={{ base: `1fr`, md: `repeat(2, 1fr)` }}
					gap={`10px 20px`}
				>
					<Box>
						<Text
							as='label'
							display='block'
							htmlFor='order'
							fontSize={`18px`}
							color='#79746C'
							textTransform='uppercase'
							marginBottom='10px'
						>
							Precio
						</Text>
						<Input
							type={`number`}
							width={`100%`}
							id='order'
							height={`50px`}
							borderColor='#9F9A93'
							paddingLeft='0.75rem'
							borderRadius={`3px`}
							_focus={{ borderColor: '#79746C', outline: 'none' }}
							// value={valueInfo.order}
							// onChange={e =>
							// 	setValueInfo({ ...valueInfo, order: Number(e.target.value) })
							// }
						/>
					</Box>
				</Grid>

				<Flex alignItems={`center`} marginTop={`25px`}>
					<Text
						marginRight={`15px`}
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
					>
						Estado:
					</Text>
					<Box>
						<Switch
							id='email-alerts'
							size={`lg`}
							defaultChecked={statusValue}
							onChange={() => setStatusValue(!statusValue)}
						/>
					</Box>
				</Flex>

				<Box marginTop={`25px`}>
					<Image
						src={image || productInfo.image}
						alt={productInfo.name}
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
					// backgroundColor={
					// 	productInfo.name !== review.name ||
					// 	productInfo.order !== review.order ||
					// 	imageExist !== review.avatar ||
					// 	statusReview !== review.status ||
					// 	!arraysEquals
					// 		? '#9F9A93'
					// 		: 'hsl(35, 6%, 80%)'
					// }
					// cursor={
					// 	productInfo.name !== review.name ||
					// 	productInfo.order !== review.order ||
					// 	imageExist !== review.avatar ||
					// 	statusReview !== review.status ||
					// 	!arraysEquals
					// 		? 'pointer'
					// 		: 'not-allowed'
					// }
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
					onClick={() =>
						productInfo.name !== product.name ||
						productInfo.category !== product.category ||
						imageExist !== product.image ||
						// statusValue !== product.status ||
						!arraysEquals
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

export default AdminProductItem;
