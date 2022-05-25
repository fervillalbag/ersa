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
import { GetServerSideProps } from 'next';
import { useRef, useState } from 'react';
import { HiPlus, HiOutlineTrash } from 'react-icons/hi';

import { HeaderInterface, Description, FileType } from '../../interfaces';
import Layout from '../../layout/admin';
import { getHeaderInfo, updateHeader } from '../../utils';
import { useImage } from '../../hooks/useImage';

type AdminHeaderProps = {
	headerData: HeaderInterface;
};

export const getServerSideProps: GetServerSideProps = async () => {
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

	const [image, setImage] = useState<string>();
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
			// TODO: Toast
			console.log(response);
			return;
		}

		const response = await updateHeader(data, headerInfo._id);
		console.log(response);
	};

	return (
		<Layout title='Header'>
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
						value={headerInfo.title}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e =>
							setHeaderInfo({ ...headerInfo, title: e.target.value })
						}
					/>
				</Box>

				<Box marginBottom='1rem'>
					<Image
						src={image || headerInfo.image}
						alt={headerInfo.title}
						width='10rem'
						height='10rem'
						objectFit='cover'
						border='1px solid #D9D9D9'
						rounded='4px'
						padding='0.5rem'
					/>
				</Box>

				<Box marginBottom='1.5rem'>
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

				<Box>
					<Text
						as='label'
						display='block'
						htmlFor='title'
						fontSize={`18px`}
						color='#79746C'
						textTransform='uppercase'
						marginBottom='10px'
					>
						Description
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
									onClick={() => handleDeleteInputDescription(item.id)}
								>
									<HiOutlineTrash />
								</Button>
							</Flex>
						</Flex>
					))}
				</Box>

				<Button
					backgroundColor='#9F9A93'
					marginTop='10px'
					borderRadius='3px'
					minWidth={`initial`}
					height={`50px`}
					padding={`0 32px`}
					color='#fff'
					fontWeight='normal'
					onClick={handleUpdateHeaderInfo}
				>
					Actualizar
				</Button>
			</Box>
		</Layout>
	);
};

export default AdminHeader;
