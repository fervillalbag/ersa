import React from 'react'
import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea,
  Flex
} from '@chakra-ui/react'

import { BsTrash } from 'react-icons/bs'

import Layout from '../../layout/admin'

const AdminHeaderPage: React.FC = () => {
  return (
    <Box>
      <Layout title="Header">
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

          <Box marginBottom="1.5rem">
            <Button
              backgroundColor="transparent"
              border="1px solid #D9D9D9"
              // onClick={() => inputImgRef.current.click()}
              _focus={{ shadow: 0 }}
              color="dark-blue"
              fontWeight="normal"
            >
              Change image
            </Button>
            <Input
              // ref={inputImgRef}
              type="file"
              // onChange={handleChangeImage}
              display="none"
            />
          </Box>

          <Box marginBottom="2rem">
            <Image
              src={''}
              // alt={data.title}
              width="10rem"
              height="10rem"
              objectFit="cover"
              border="1px solid #D9D9D9"
              rounded="4px"
              padding="0.5rem"
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
                border="1px solid #D9D9D9"
                marginLeft="0.75rem"
                backgroundColor="red.400"
                color="white"
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

          <Button
            backgroundColor="dark-blue"
            marginTop="1.5rem"
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

export default AdminHeaderPage
