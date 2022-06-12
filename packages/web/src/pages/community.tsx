import { GetStaticProps } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { Pagination, Autoplay } from 'swiper';

import Layout from '../layout';
import { getBanners } from '../utils/community';
import { BannerType } from '../interfaces/Community';

import 'swiper/css';
import 'swiper/css/pagination';

type CommunityProps = {
	banners: BannerType[];
};

export const getStaticProps: GetStaticProps = async () => {
	const banners = await getBanners();

	return {
		props: {
			banners: banners.banners,
		},
	};
};

const Community = ({ banners }: CommunityProps) => {
	return (
		<Layout title='Community | Landing Ersa'>
			<Swiper
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination, Autoplay]}
				className='mySwiper'
			>
				{banners.map(banner => (
					<SwiperSlide key={banner._id}>
						<Image
							width={`100%`}
							height={{ base: `250px`, md: `500px` }}
							objectFit={`cover`}
							src={banner.image}
							alt={banner.title}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<Box
				maxWidth={`1170px`}
				margin={`0 auto`}
				width={`90%`}
				padding={`4rem 0`}
			>
				<Heading variant={`title`} marginBottom={`20px`}>
					Community
				</Heading>
				<Text variant={`description`} marginBottom={`1.2rem`}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
					officiis dolores provident omnis iste similique sequi cum quisquam
					quidem excepturi nemo deleniti quam nam non rem autem saepe quibusdam
					dicta cupiditate, repellendus sunt eligendi accusantium? Asperiores
					adipisci nulla debitis neque!
				</Text>
				<Text variant={`description`}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore in
					consequatur cupiditate neque modi ullam? Officia atque quas minus
					quasi. Doloremque tempore voluptatem iure, dolore consectetur neque
					tenetur, ex exercitationem omnis sed rem. Corporis a tenetur sit, iste
					accusantium natus molestias. Laudantium perferendis cum sed itaque
					labore expedita eveniet nesciunt omnis delectus ea accusamus ab
					exercitationem corporis, architecto minima asperiores veritatis dolore
					quibusdam, laboriosam, corrupti deserunt ut! Impedit, fugit magnam!
				</Text>
			</Box>
		</Layout>
	);
};

export default Community;
