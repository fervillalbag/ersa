import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import {
	Box,
	Button,
	Flex,
	Grid,
	Image,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
} from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import { BannerType } from '../../../interfaces/Community';
import Layout from '../../../layout/admin';
import { deleteBanner, getBanners } from '../../../utils/community';
import toast from 'react-hot-toast';

type AdminBanner = {
	banners: BannerType[];
};

type BannerItemProps = {
	banner: BannerType;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const banners = await getBanners();

	return {
		props: {
			banners: banners.banners,
		},
	};
};

export const BannerItem = ({ banner }: BannerItemProps) => {
	const router = useRouter();

	const { isOpen, onClose, onOpen } = useDisclosure();

	const handleDeleteBannerItem = async () => {
		const response = await deleteBanner(banner._id);

		if (response.success) {
			router.push('/admin/banner');
			onClose();
			return toast.success('Eliminado correctamente');
		}

		onClose();
	};

	return (
		<Box position={`relative`}>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent borderRadius={`3px`}>
					<ModalHeader color='#79746C'>¿Desea eliminar la reseña?</ModalHeader>
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
							onClick={handleDeleteBannerItem}
						>
							Confirmar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box
				position={`absolute`}
				left={`0`}
				top={`0`}
				backgroundColor={`rgba(0,0,0,0.3)`}
				width={`100%`}
				height={`100%`}
			></Box>

			<Image
				src={banner.image}
				width={`100%`}
				height={`180px`}
				objectFit={`cover`}
				alt={banner.title}
			/>

			<Grid
				placeItems={`center`}
				width={`30px`}
				height={`30px`}
				backgroundColor={`#F8F5ED`}
				borderRadius={`3px`}
				position={`absolute`}
				zIndex={`50`}
				top={`10px`}
				left={`10px`}
			>
				<Text color={`#79746C`} fontSize={`18px`} fontWeight={`bold`}>
					{banner.order}
				</Text>
			</Grid>

			<Grid
				placeItems={`center`}
				display={`inline-grid`}
				height={`30px`}
				backgroundColor={`#79746C`}
				borderRadius={`3px`}
				padding={`0 10px`}
				position={`absolute`}
				zIndex={`50`}
				top={`10px`}
				right={`10px`}
			>
				<Text
					color={`#F8F5ED`}
					textTransform={`uppercase`}
					fontSize={`12px`}
					fontWeight={`semibold`}
				>
					{banner.status ? `Activo` : `Inactivo`}
				</Text>
			</Grid>

			<Flex position={`absolute`} zIndex={`50`} bottom={`10px`} right={`10px`}>
				<Button
					width={`40px`}
					height={`40px`}
					borderRadius={`3px`}
					color={`#79746C`}
					backgroundColor={`#F8F5ED`}
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#F8F5ED` }}
					_active={{ backgroundColor: `#F8F5ED` }}
					onClick={() => router.push(`/admin/banner/${banner._id}`)}
				>
					<Text fontSize={`20px`}>
						<HiOutlinePencilAlt />
					</Text>
				</Button>
				<Button
					marginLeft={`10px`}
					width={`40px`}
					height={`40px`}
					borderRadius={`3px`}
					backgroundColor={`#9F9A93`}
					_focus={{ outline: 'none' }}
					_active={{ backgroundColor: `#9F9A93` }}
					_hover={{ backgroundColor: `#9F9A93` }}
					onClick={onOpen}
				>
					<Text fontSize={`20px`} color={`#F8F5ED`}>
						<BsFillTrashFill />
					</Text>
				</Button>
			</Flex>
		</Box>
	);
};

const AdminBanner = ({ banners }: AdminBanner) => {
	const router = useRouter();

	return (
		<Layout title='Lista de banners'>
			<Box>
				<Button
					border={`1px solid #79746C`}
					borderRadius={`3px`}
					backgroundColor={`#FFF`}
					minWidth={`initial`}
					height={`45px`}
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#FFF` }}
					_active={{ backgroundColor: `#FFF` }}
					onClick={() => router.push(`/admin/banner/create`)}
				>
					<Text color={`#79746C`}>Crear un banner</Text>
				</Button>
			</Box>

			<Box marginTop={`25px`}>
				<Grid
					gridTemplateColumns={{
						base: `1fr`,
						md: `repeat(2, 1fr)`,
						lg: `repeat(3, 1fr)`,
					}}
					gap={`15px`}
				>
					{banners.map(banner => (
						<BannerItem key={banner._id} banner={banner} />
					))}
				</Grid>
			</Box>
		</Layout>
	);
};

export default AdminBanner;
