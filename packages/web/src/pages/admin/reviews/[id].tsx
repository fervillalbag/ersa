import { Box, Button, Input, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { ReviewType } from '../../../interfaces';

import Layout from '../../../layout/admin';
import { getReview } from '../../../utils';

type AdminReviewItemProps = {
	review: ReviewType;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const review = await getReview(context.params.id as string);

	return {
		props: {
			review: review.review,
		},
	};
};

const AdminReviewItem = ({ review }: AdminReviewItemProps) => {
	const router = useRouter();

	const [reviewInfo, setReviewInfo] = useState(review);

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
						value={reviewInfo.order}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e =>
							setReviewInfo({ ...reviewInfo, order: Number(e.target.value) })
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
						Nombre
					</Text>
					<Input
						id='title'
						height={`50px`}
						borderColor='#9F9A93'
						paddingLeft='0.75rem'
						value={reviewInfo.name}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e =>
							setReviewInfo({ ...reviewInfo, name: e.target.value })
						}
					/>
				</Box>
			</Box>
		</Layout>
	);
};

export default AdminReviewItem;
