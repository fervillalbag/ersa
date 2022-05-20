import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	Text,
	Textarea,
} from '@chakra-ui/react';
import produce from 'immer';
import { GetStaticProps } from 'next';
import { useRef, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { HeaderInterface, Description, FileType } from '../../interfaces';
import Layout from '../../layout/admin';
import { getHeaderInfo, updateHeader } from '../../utils';
import { useImage } from '../../hooks/useImage';

type AdminHeaderProps = {
	headerData: HeaderInterface;
};

export const getStaticProps: GetStaticProps = async () => {
	const headerData = await getHeaderInfo();

	return {
		props: {
			headerData,
		},
	};
};

const AdminHeader = ({ headerData }: AdminHeaderProps) => {
	const [headerInfo, setHeaderInfo] = useState(headerData.header);
	const [descriptionArray, setDescriptionArray] = useState(
		headerData.header.description
	);

	const [image, setImage] = useState<string>(headerInfo.image);
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
		setFileImage(file);
	};

	const handleUpdateHeaderInfo = async () => {
		if (!headerInfo.title) return;

		const data = {
			title: headerInfo.title,
			image,
			description: descriptionArray,
		};

		if (image) {
			const responseImage = await useImage(fileImage as string);

			const data = {
				title: headerInfo.title,
				image: responseImage,
				description: descriptionArray,
			};

			const response = await updateHeader(data, headerInfo._id);
			console.log(response);
			return;
		}

		const response = await updateHeader(data, headerInfo._id);
		console.log(response);
	};

	return (
		<Layout title='Header'>
			<Box maxWidth='600px'>
				<Box marginBottom='1.5rem'>
					<Text
						as='label'
						display='block'
						htmlFor='title'
						color='dark-grayish-blue'
						textTransform='uppercase'
						fontWeight='semibold'
						marginBottom='0.35rem'
					>
						Title
					</Text>
					<Input
						id='title'
						borderColor='dark-grayish-blue'
						borderRadius='4px'
						paddingLeft='0.75rem'
						value={headerInfo.title}
						onChange={e =>
							setHeaderInfo({ ...headerInfo, title: e.target.value })
						}
					/>
				</Box>

				<Box marginBottom='1.5rem'>
					<Button
						backgroundColor='transparent'
						border='1px solid #D9D9D9'
						onClick={() => inputImgRef.current.click()}
						_focus={{ shadow: 0 }}
						color='dark-blue'
						fontWeight='normal'
					>
						Change image
					</Button>
					<Input
						ref={inputImgRef}
						type='file'
						onChange={handleChangeImage}
						display='none'
					/>
				</Box>

				<Box marginBottom='2rem'>
					<Image
						src={image}
						alt={headerInfo.title}
						width='10rem'
						height='10rem'
						objectFit='cover'
						border='1px solid #D9D9D9'
						rounded='4px'
						padding='0.5rem'
					/>
				</Box>

				<Box>
					<Text
						as='label'
						display='block'
						htmlFor='title'
						color='dark-grayish-blue'
						textTransform='uppercase'
						fontWeight='semibold'
						marginBottom='0.35rem'
					>
						Description
					</Text>

					{descriptionArray.map((item, index) => (
						<Flex marginBottom='1rem' key={item.id}>
							<Textarea
								id='title'
								borderColor='dark-grayish-blue'
								borderRadius='4px'
								paddingLeft='0.75rem'
								height='8rem'
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
							<Button
								minWidth='initial'
								height='auto'
								border='1px solid #D9D9D9'
								marginLeft='0.75rem'
								backgroundColor='red.400'
								color='white'
								fontSize='1.2rem'
								_focus={{ shadow: 0 }}
								onClick={() => handleDeleteInputDescription(item.id)}
							>
								<BsTrash />
							</Button>
						</Flex>
					))}

					<Button
						backgroundColor='transparent'
						border='1px solid #D9D9D9'
						_focus={{ shadow: 0 }}
						color='dark-blue'
						fontWeight='normal'
						onClick={handleAddInputDescription}
					>
						Add description
					</Button>
				</Box>

				<Button
					backgroundColor='dark-blue'
					marginTop='1.5rem'
					rounded='4px'
					color='white'
					fontWeight='semibold'
					padding='0.75rem 2rem'
					onClick={handleUpdateHeaderInfo}
				>
					Update Info
				</Button>
			</Box>
		</Layout>
	);
};

export default AdminHeader;
