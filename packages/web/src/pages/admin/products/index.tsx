import {
	Box,
	Button,
	Grid,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

import Layout from '../../../layout/admin';
import { deleteProduct, getProducts } from '../../../utils';

export const getServerSideProps: GetServerSideProps = async () => {
	const products = await getProducts();

	return {
		props: {
			products: products.products,
		},
	};
};

// TODO: fixed type validation props
/* eslint-disable */
const TableRow = ({ value }: any) => {
	const router = useRouter();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const handleDeleteReviewItem = async () => {
		const response = await deleteProduct(value._id);

		if (response.success) {
			router.push('/admin/products');
			onClose();
			return toast.success('Eliminado correctamente');
		}

		onClose();
	};

	return (
		<Grid
			gridTemplateColumns={`1fr 50px 50px`}
			gap={`15px`}
			alignItems={`center`}
			marginBottom={`15px`}
		>
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
							onClick={handleDeleteReviewItem}
						>
							Confirmar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Grid
				gridTemplateColumns={`35px 1fr 80px 80px 80px`}
				backgroundColor={`#F8F5ED`}
				gap={`15px`}
				borderRadius={`3px`}
				alignItems={`center`}
				height={`50px`}
				cursor={`pointer`}
				onClick={() => router.push(`/admin/products/${value._id}`)}
				paddingLeft={`15px`}
			>
				<Box>
					<Image
						src={value.image}
						alt={value.name}
						width={`35px`}
						height={`35px`}
						objectFit={`cover`}
						borderRadius={`50%`}
						border={`1px solid #d9d9d9`}
					/>
				</Box>
				<Box color={`#79746C`} fontSize={`14px`}>
					{value.name.slice(0, 50)}
					{value.name.length > 50 ? '..' : ''}
				</Box>
				<Box
					color={`#79746C`}
					fontSize={`14px`}
					fontWeight={`bold`}
					textAlign={`center`}
				>
					{value.quantity}
				</Box>
				<Box
					color={`#79746C`}
					fontSize={`14px`}
					fontWeight={`bold`}
					textAlign={`center`}
				>
					{value.status ? 'Activo' : 'Inactivo'}
				</Box>
				<Box
					color={`#79746C`}
					fontSize={`14px`}
					fontWeight={`bold`}
					textAlign={`center`}
				>
					${value.price}
				</Box>
			</Grid>
			<Box>
				<Button
					border={`1px solid #79746C`}
					borderRadius={`3px`}
					backgroundColor={`#FFF`}
					minWidth={`initial`}
					width={`100%`}
					height={`50px`}
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#FFF` }}
					onClick={() => router.push(`/admin/products/${value._id}`)}
				>
					<Text fontSize={`20px`} color={`#79746C`}>
						<HiOutlinePencilAlt />
					</Text>
				</Button>
			</Box>
			<Box>
				<Button
					backgroundColor={`#79746C`}
					borderRadius={`3px`}
					minWidth={`initial`}
					width={`100%`}
					height={`50px`}
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#79746C` }}
					onClick={onOpen}
				>
					<Text fontSize={`20px`} color={`#FFF`}>
						<HiOutlineTrash />
					</Text>
				</Button>
			</Box>
		</Grid>
	);
};

const AdminProducts = ({ products }) => {
	const router = useRouter();

	return (
		<Layout title='Lista de productos'>
			<Box marginBottom={`25px`}>
				<Button
					border={`1px solid #79746C`}
					borderRadius={`3px`}
					backgroundColor={`#FFF`}
					minWidth={`initial`}
					height={`45px`}
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#FFF` }}
					onClick={() => router.push(`/admin/products/create`)}
				>
					<Text color={`#79746C`}>Crear un producto</Text>
				</Button>
			</Box>

			<Grid
				gridTemplateColumns={`35px 1fr 80px 80px 80px 50px 50px`}
				gap={`15px`}
				paddingLeft={`15px`}
			>
				<Box></Box>
				<Box color={`#79746c`}>Nombre</Box>
				<Box color={`#79746c`} textAlign={`center`}>
					Cant
				</Box>
				<Box color={`#79746c`} textAlign={`center`}>
					Estado
				</Box>
				<Box color={`#79746c`} textAlign={`center`}>
					Precio
				</Box>
				<Box color={`#79746c`} gridColumn={`6/8`}>
					Acciones
				</Box>
			</Grid>

			<Box marginTop={`15px`}>
				{products.map(item => (
					<Box key={item._id}>
						<TableRow value={item} />
					</Box>
				))}
			</Box>
		</Layout>
	);
};

export default AdminProducts;
