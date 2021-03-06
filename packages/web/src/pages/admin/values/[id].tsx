import { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Input,
	Switch,
	Text,
	Textarea,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
} from '@chakra-ui/react';
import produce from 'immer';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { HiOutlineChevronLeft, HiOutlineTrash, HiPlus } from 'react-icons/hi';

import { Description, ValueType } from '../../../interfaces';
import Layout from '../../../layout/admin';
import { getValue, updateValue } from '../../../utils';
import toast from 'react-hot-toast';

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

	const { isOpen, onClose, onOpen } = useDisclosure();

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
		if (!valueInfo.title || valueInfo.order <= 0)
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});

		const result = descriptionArray.some(item => item.text === '');

		if (result) {
			return toast('Todos los campos son obligatorios!', {
				icon: '🤨',
			});
		}

		try {
			const data = {
				title: valueInfo.title,
				order: valueInfo.order,
				status: statusValue,
				description: descriptionArray,
			};

			const response = await updateValue(data, valueInfo._id);

			if (response.success) {
				onClose();
				router.push('/admin/values');
				return toast.success('Actualizado correctamente');
			}

			onClose();
			router.push('/admin/values');
			return toast.error('Hubo un problema al actualizar');
		} catch (error) {
			console.log(error);
		}
	};

	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val.text === b[index].text)
		);
	}

	const arraysEquals = arrayEquals(value.description, descriptionArray);

	return (
		<Layout>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent borderRadius={`3px`}>
					<ModalHeader color='#79746C'>
						¿Desea actualizar la información?
					</ModalHeader>
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
							onClick={handleUpdateValueItem}
						>
							Confirmar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

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
							setValueInfo({ ...valueInfo, order: Number(e.target.value) })
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

					<Button
						backgroundColor={
							valueInfo.title !== value.title ||
							valueInfo.order !== value.order ||
							statusValue !== value.status ||
							!arraysEquals
								? '#9F9A93'
								: 'hsl(35, 6%, 80%)'
						}
						cursor={
							valueInfo.title !== value.title ||
							valueInfo.order !== value.order ||
							statusValue !== value.status ||
							!arraysEquals
								? 'pointer'
								: 'not-allowed'
						}
						marginTop='10px'
						borderRadius='3px'
						minWidth={`initial`}
						height={`50px`}
						padding={`0 32px`}
						color='#fff'
						fontWeight='normal'
						_focus={{ outline: 'none' }}
						_active={{ backgroundColor: `hsl(35, 6%, 80%)` }}
						_hover={{ backgroundColor: `hsl(35, 6%, 80%)` }}
						onClick={() =>
							valueInfo.title !== value.title ||
							valueInfo.order !== value.order ||
							statusValue !== value.status ||
							!arraysEquals
								? onOpen()
								: null
						}
					>
						Actualizar
					</Button>
				</Box>
			</Box>
		</Layout>
	);
};

export default AdminValueItem;
