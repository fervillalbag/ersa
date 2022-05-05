import React from 'react'
import { NextPage } from 'next'
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'

import Layout from '../../../layout/admin'
import { useRouter } from 'next/router'

const GrowthItem: NextPage = () => {
  const router = useRouter()

  return (
    <Box>
      <Layout
        onClick={() => router.push('/admin/growth')}
        title="Growh Item"
        showNavbar={false}
      >
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
        </Box>
      </Layout>
    </Box>
  )
}

export default GrowthItem
