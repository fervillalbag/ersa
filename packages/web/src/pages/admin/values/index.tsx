import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

import Layout from '../../../layout/admin';
import { getValues } from '../../../utils';
import { ValueInterface } from '../../../interfaces/Value';
import { useRouter } from 'next/router';

type AdminValueProps = {
	valuesData: ValueInterface;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const valuesData = await getValues();

	return {
		props: {
			valuesData,
		},
	};
};

// TODO: fixed type validation props
/* eslint-disable */
const TableRow = ({ value }: any) => {
	const router = useRouter();

	return (
		<Grid
			gridTemplateColumns={`1fr 50px 50px`}
			gap={`15px`}
			alignItems={`center`}
			marginBottom={`15px`}
		>
			<Grid
				gridTemplateColumns={`50px 1fr 100px`}
				backgroundColor={`#F8F5ED`}
				gap={`15px`}
				borderRadius={`3px`}
				alignItems={`center`}
				height={`50px`}
				cursor={`pointer`}
				onClick={() => router.push(`/admin/values/${value._id}`)}
			>
				<Box textAlign={`center`} color={`#79746C`} fontWeight={`bold`}>
					{value.order}
				</Box>
				<Box color={`#79746C`} fontSize={`14px`}>
					{value.title}
				</Box>
				<Box color={`#79746C`} fontSize={`14px`} fontWeight={`bold`}>
					{value.status ? 'Activo' : 'Inactivo'}
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
					onClick={() => router.push(`/admin/values/${value._id}`)}
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
				>
					<Text fontSize={`20px`} color={`#FFF`}>
						<HiOutlineTrash />
					</Text>
				</Button>
			</Box>
		</Grid>
	);
};

const AdminValues: React.FC<AdminValueProps> = ({
	valuesData,
}: AdminValueProps) => {
	return (
		<Layout title='Lista de valores'>
			{/* <Text></Text> */}

			<Grid gridTemplateColumns={`50px 1fr 100px 50px 50px`} gap={`15px`}>
				<Box color={`#79746c`} textAlign={`center`}>
					Nro
				</Box>
				<Box color={`#79746c`}>Título</Box>
				<Box color={`#79746c`}>Estado</Box>
				<Box color={`#79746c`} gridColumn={`4/6`}>
					Acciones
				</Box>
			</Grid>

			<Box marginTop={`15px`}>
				{valuesData.values.map((item, index: number) => (
					<Box key={item._id}>
						<TableRow value={item} />
					</Box>
				))}
			</Box>
		</Layout>
	);
};

export default AdminValues;
