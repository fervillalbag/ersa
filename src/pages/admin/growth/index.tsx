import React from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'

import Layout from '../../../layout/admin'
import { FiEdit } from 'react-icons/fi'

const GrowthAdminPage: React.FC = () => {
  return (
    <Box>
      <Layout title="Growth">
        <Box maxWidth="600px">
          <Box marginBottom="1.5rem">
            <Text
              as="label"
              display="block"
              htmlFor="title"
              color="dark-grayish-blue"
              textTransform="uppercase"
              fontWeight="semibold"
              marginBottom="0.35rem"
            >
              Title
            </Text>
            <Input
              id="title"
              borderColor="dark-grayish-blue"
              borderRadius="4px"
              paddingLeft="0.75rem"
              // value={data.title}
              // onChange={e => setData({ ...data, title: e.target.value })}
            />
          </Box>

          <Box>
            <Text
              as="label"
              display="block"
              htmlFor="title"
              color="dark-grayish-blue"
              textTransform="uppercase"
              fontWeight="semibold"
              marginBottom="0.35rem"
            >
              Description
            </Text>

            <Flex marginBottom="1rem">
              <Textarea
                id="title"
                borderColor="dark-grayish-blue"
                borderRadius="4px"
                paddingLeft="0.75rem"
                height="8rem"
                resize="none"
                // value={description.text}
                // onChange={e => {
                //   const text = e.target.value
                //   setDescriptionArray(currentDescription =>
                //     produce(currentDescription, v => {
                //       v[index].text = text
                //     })
                //   )
                // }}
              />
              <Button
                minWidth="initial"
                height="auto"
                marginLeft="0.75rem"
                backgroundColor="red.400"
                color="white"
                rounded="4px"
                fontSize="1.2rem"
                _focus={{ shadow: 0 }}
                // onClick={() => handleDeleteInputDescription(description.id)}
              >
                <BsTrash />
              </Button>
            </Flex>

            <Button
              backgroundColor="transparent"
              border="1px solid #D9D9D9"
              _focus={{ shadow: 0 }}
              color="dark-blue"
              fontWeight="normal"
              // onClick={handleAddInputDescription}
            >
              Add description
            </Button>
          </Box>

          <Box marginTop="2rem">
            <Text
              fontSize="1.2rem"
              fontWeight="semibold"
              marginBottom="0.6rem"
              color="dark-blue"
            >
              List of what growth facts
            </Text>

            <Grid gridTemplateColumns="1fr repeat(3, 60px)" padding="0.8rem">
              <Box>
                <Text
                  fontSize="0.9rem"
                  textTransform="uppercase"
                  fontWeight="bold"
                  color="dark-grayish-blue"
                >
                  Title
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="0.9rem"
                  textTransform="uppercase"
                  fontWeight="bold"
                  color="dark-grayish-blue"
                >
                  Order
                </Text>
              </Box>
              <Box gridColumn="3/5">
                <Text
                  textAlign="center"
                  fontSize="0.9rem"
                  textTransform="uppercase"
                  fontWeight="bold"
                  color="dark-grayish-blue"
                >
                  Actions
                </Text>
              </Box>
            </Grid>

            <Box>
              <Grid
                gridTemplateColumns="1fr auto"
                width="100%"
                padding="0.8rem"
                alignItems="center"
                justifyContent="space-between"
                backgroundColor="#FFF"
                marginBottom="1rem"
                borderRadius="4px"
              >
                <Box>{/* <Text>{item.title}</Text> */}</Box>
                <Grid gridTemplateColumns="repeat(3, 60px)">
                  <Box
                    padding="0.5rem"
                    border="1px solid #d9d9d9"
                    rounded="4px"
                  >
                    <Text textAlign="center" fontSize="0.8rem">
                      2
                    </Text>
                  </Box>

                  <Button
                    minWidth="initial"
                    marginLeft="0.75rem"
                    color="dark-blue"
                    border="1px solid"
                    borderColor="dark-blue"
                    rounded="4px"
                    fontSize="1.2rem"
                    _focus={{ shadow: 0 }}
                    // onClick={() => router.push(`/admin/growth/${item._id}`)}
                  >
                    <FiEdit />
                  </Button>
                  <Button
                    minWidth="initial"
                    marginLeft="0.75rem"
                    backgroundColor="red.400"
                    rounded="4px"
                    color="white"
                    fontSize="1.2rem"
                    _focus={{ shadow: 0 }}
                    onClick={() => {
                      // onOpen()
                      // setCurrentIdGrowthItem(item._id)
                    }}
                  >
                    <BsTrash />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Modal
            isOpen={false}
            onClose={() => console.log('close')}
            isCentered
            size="sm"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader padding="15px">Eliminar</ModalHeader>
              <ModalCloseButton />
              <ModalBody padding="0 15px">¿Desea eliminar el ítem?</ModalBody>

              <ModalFooter
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap="15px"
                padding="15px"
                marginTop="10px"
              >
                <Button
                  rounded="3px"
                  width="100%"
                  color="#3E3E3E"
                  backgroundColor="#F0F0F0"
                  onClick={() => console.log('close')}
                >
                  Cerrar
                </Button>
                <Button
                  rounded="3px"
                  width="100%"
                  color="red.700"
                  backgroundColor="red.100"
                  _focus={{ shadow: 0 }}
                  _hover={{ backgroundColor: 'red.200' }}
                  // onClick={handleDeleteGrowthItem}
                >
                  Si, eliminar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Button
            backgroundColor="dark-blue"
            marginTop="1rem"
            rounded="4px"
            color="white"
            fontWeight="semibold"
            padding="0.75rem 2rem"
            // onClick={handleUpdateHeader}
          >
            Update Info
          </Button>
        </Box>
      </Layout>
    </Box>
  )
}

export default GrowthAdminPage
