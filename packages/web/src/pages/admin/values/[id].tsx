import { Box, Button, Input, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { ValueType } from '../../../interfaces';

import Layout from '../../../layout/admin';
import { getValue } from '../../../utils';

type AdminValueItemProps = {
	value: ValueType;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const valueData = await getValue(context.params.id as string);

	return {
		props: {
			value: valueData.value,
		},
	};
};

const AdminValueItem = ({ value }: AdminValueItemProps) => {
	const router = useRouter();
	console.log(value);

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
							Title
						</Text>
						<Input
							id='title'
							height={`50px`}
							borderColor='#9F9A93'
							paddingLeft='0.75rem'
							// value={headerInfo.title}
							borderRadius={`3px`}
							_focus={{ borderColor: '#79746C', outline: 'none' }}
							// onChange={e =>
							// 	setHeaderInfo({ ...headerInfo, title: e.target.value })
							// }
						/>
					</Box>
				</Box>
			</Box>
		</Layout>
	);
};

export default AdminValueItem;
