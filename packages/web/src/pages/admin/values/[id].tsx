import {
	Box,
	Button,
	Flex,
	Input,
	Switch,
	Text,
	Textarea,
} from '@chakra-ui/react';
import produce from 'immer';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineTrash, HiPlus } from 'react-icons/hi';

import { Description, ValueType } from '../../../interfaces';
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

	const [valueInfo, setValueInfo] = useState(value);
	const [statusValue, setStatusValue] = useState(value.status);
	const [descriptionArray, setDescriptionArray] = useState(value.description);

	console.log(value);

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

	const handleUpdateValueItem = async () => {
		console.log(statusValue);
	};

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
					onClick={() => router.push('/admin/values')}
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
						value={valueInfo.order}
						borderRadius={`3px`}
						_focus={{ borderColor: '#79746C', outline: 'none' }}
						onChange={e =>
							setValueInfo({ ...valueInfo, order: parseInt(e.target.value) })
						}
					/>
				</Box>

				<Box marginTop={`25px`}>
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
							Título
						</Text>
						<Input
							id='title'
							height={`50px`}
							borderColor='#9F9A93'
							paddingLeft='0.75rem'
							value={valueInfo.title}
							borderRadius={`3px`}
							_focus={{ borderColor: '#79746C', outline: 'none' }}
							onChange={e =>
								setValueInfo({ ...valueInfo, title: e.target.value })
							}
						/>
					</Box>
					<Flex alignItems={`center`}>
						<Text
							marginRight={`15px`}
							fontSize={`18px`}
							color='#79746C'
							textTransform='uppercase'
						>
							Estado:
						</Text>
						<Box>
							<Switch
								id='email-alerts'
								size={`lg`}
								defaultChecked={statusValue}
								onChange={() => setStatusValue(!statusValue)}
							/>
						</Box>
					</Flex>

					<Box marginTop={`25px`}>
						<Text
							as='label'
							display='block'
							htmlFor='title'
							fontSize={`18px`}
							color='#79746C'
							textTransform='uppercase'
							marginBottom='10px'
						>
							Descripción
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
										_hover={{ backgroundColor: `#FFF` }}
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
										_hover={{ backgroundColor: `#9F9A93` }}
										onClick={() => handleDeleteInputDescription(item.id)}
									>
										<HiOutlineTrash />
									</Button>
								</Flex>
							</Flex>
						))}
					</Box>

					<Button onClick={handleUpdateValueItem}>submit</Button>
				</Box>
			</Box>
		</Layout>
	);
};

export default AdminValueItem;
