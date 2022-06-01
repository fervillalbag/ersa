import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	Switch,
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
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineChevronLeft, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { useImage } from '../../../hooks/useImage';
import { Description, FileType } from '../../../interfaces';
import { BannerType } from '../../../interfaces/Community';

import Layout from '../../../layout/admin';
import { getBanner, updateBanner } from '../../../utils/community';

type AdminBannerItem = {
	banner: BannerType;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const banner = await getBanner(context.params.id as string);

	return {
		props: {
			banner: banner.banner,
		},
	};
};

const AdminBannerItem = ({ banner }: AdminBannerItem) => {
	const router = useRouter();

	const [bannerInfo, setBannerInfo] = useState(banner);
	const [descriptionArray, setDescriptionArray] = useState(banner.description);
	const [statusBanner, setStatusBanner] = useState(banner.status);

	const [imageExist, setImageExist] = useState(banner.image);
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
		setImageExist(image);
		setFileImage(file);
	};

	useEffect(() => {
		setImage(null);
		setFileImage(null);
		setImageExist(banner.image);
	}, []);

	const handleAddInputDescription = () => {
		setDescriptionArray([...descriptionArray, newInputDescription]);
	};

	const handleDeleteInputDescription = id => {
		setDescriptionArray(description =>
			description.filter(item => item.id !== id)
		);
	};

	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val.text === b[index].text)
		);
	}

	const arraysEquals = arrayEquals(banner.description, descriptionArray);

	const handleBannerUpdate = async () => {
		if (bannerInfo.order < 0 || !imageExist)
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});

		try {
			const data = {
				title: bannerInfo.title,
				order: bannerInfo.order,
				status: statusBanner,
				image: bannerInfo.image,
				description: descriptionArray,
			};

			if (image) {
				const responseImage = await useImage(fileImage as string);

				const data = {
					title: bannerInfo.title,
					image: responseImage,
					order: bannerInfo.order,
					status: statusBanner,
					description: descriptionArray,
				};

				const response = await updateBanner(data, banner._id);

				if (response.success) {
					onClose();
					router.push('/admin/banner');
					return toast.success('Actualizado correctamente');
				}

				onClose();
				router.push('/admin/banner');
				return toast.error('Hubo un problema al actualizar');
			}

			const response = await updateBanner(data, banner._id);

			if (response.success) {
				onClose();
				router.push('/admin/banner');
				return toast.success('Actualizado correctamente');
			}

			onClose();
			router.push('/admin/banner');
			return toast.error('Hubo un problema al actualizar');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout title={`Edita banner`}>
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
							onClick={handleBannerUpdate}
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
					onClick={() => router.push('/admin/banner')}
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
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={bannerInfo.order}
						onChange={e =>
							setBannerInfo({ ...bannerInfo, order: Number(e.target.value) })
						}
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
						Título
					</Text>
					<Input
						id='title'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						value={bannerInfo.title}
						onChange={e =>
							setBannerInfo({ ...bannerInfo, title: e.target.value })
						}
					/>
				</Box>

				<Box marginTop={`25px`}>
					<Image
						src={image || bannerInfo.image}
						alt={bannerInfo.title}
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
							defaultChecked={statusBanner}
							onChange={() => setStatusBanner(!statusBanner)}
						/>
					</Box>
				</Flex>

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
						bannerInfo.title !== banner.title ||
						bannerInfo.order !== banner.order ||
						imageExist !== banner.image ||
						statusBanner !== banner.status ||
						!arraysEquals
							? '#9F9A93'
							: 'hsl(35, 6%, 80%)'
					}
					cursor={
						bannerInfo.title !== banner.title ||
						bannerInfo.order !== banner.order ||
						imageExist !== banner.image ||
						statusBanner !== banner.status ||
						!arraysEquals
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
					_active={{ backgroundColor: `hsl(35, 6%, 80%)` }}
					_hover={{ backgroundColor: `hsl(35, 6%, 80%)` }}
					onClick={() =>
						bannerInfo.title !== banner.title ||
						bannerInfo.order !== banner.order ||
						imageExist !== banner.image ||
						statusBanner !== banner.status ||
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

export default AdminBannerItem;
