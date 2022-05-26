import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import Layout from '../../../layout/admin';

const AdminValueItem = () => {
	const router = useRouter();

	return (
		<Layout>
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
					onClick={() => router.push('/admin/values')}
				>
					<Text fontSize={`18px`}>
						<HiOutlineChevronLeft />
					</Text>
					<Text fontSize={`14px`} marginLeft={`5px`} fontWeight={`regular`}>
						Volver
					</Text>
				</Button>
			</Box>
		</Layout>
	);
};

export default AdminValueItem;
