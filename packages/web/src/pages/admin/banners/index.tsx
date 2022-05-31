import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import { BannerType } from '../../../interfaces/Community';
import Layout from '../../../layout/admin';
import { getBanners } from '../../../utils/community';

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
	console.log(banner);

	return (
		<Box position={`relative`}>
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
				// width={`/`}
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
	console.log(banners);

	const router = useRouter();

	return (
		<Layout title='Lista de banners'>
			<Box>
				<Button
					border={`1px solid #79746C`}
					borderRadius={`3px`}
					backgroundColor={`#FFF`}
					minWidth={`initial`}
					// width={`100%`}
					height={`45px`}
					_focus={{ outline: 'none' }}
					_hover={{ backgroundColor: `#FFF` }}
					_active={{ backgroundColor: `#FFF` }}
					onClick={() => router.push(`/admin/banners/create`)}
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
						// xl: `repeat(4, 1fr)`,
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
