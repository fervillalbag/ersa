import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { BsTrash } from 'react-icons/bs'

import Layout from '../../../layout/admin'
import { useRouter } from 'next/dist/client/router'
import { Growth } from '../../../interfaces/Growths'

interface DataGrowthItemIprops {
  dataGrowthItem: Growth
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const URL =
      process.env.NEXT_PUBLIC_ENV !== 'development'
        ? process.env.URL_ROOT
        : process.env.URL_ROOT_LOCAL

    const responseGrowthItems = await fetch(`${URL}/api/growthItems`)
    const growthItems = await responseGrowthItems.json()

    const paths = growthItems.data.map(growthItem => ({
      params: { id: growthItem._id.toString() }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.log(error)
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  try {
    const URL =
      process.env.NEXT_PUBLIC_ENV !== 'development'
        ? process.env.URL_ROOT
        : process.env.URL_ROOT_LOCAL

    const responseGrowthItem = await fetch(`${URL}/api/growthItems/${id}`)

    const dataGrowthItem = await responseGrowthItem.json()

    return {
      props: {
        dataGrowthItem: dataGrowthItem.data
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const GrowthItem: NextPage<DataGrowthItemIprops> = ({ dataGrowthItem }) => {
  const router = useRouter()

  const [data, setData] = useState(dataGrowthItem)
  const [descriptionArray, setDescriptionArray] = useState(data.description)

  const newInputDescription = {
    id: uuidv4(),
    text: ''
  }

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newInputDescription])
  }

  const handleDeleteInputDescription = (id: string) => {
    const newInputDescription = descriptionArray.filter(item => item.id !== id)
    setDescriptionArray(newInputDescription)
  }

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
              value={data.title}
              onChange={e => setData({ ...data, title: e.target.value })}
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

            {descriptionArray.map((description, index) => (
              <Flex key={description.id} marginBottom="1rem">
                <Textarea
                  id="title"
                  borderColor="dark-grayish-blue"
                  borderRadius="4px"
                  paddingLeft="0.75rem"
                  height="8rem"
                  resize="none"
                  value={description.text}
                  onChange={e => {
                    const text = e.target.value
                    setDescriptionArray(currentDescription =>
                      produce(currentDescription, v => {
                        v[index].text = text
                      })
                    )
                  }}
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
                  onClick={() => handleDeleteInputDescription(description.id)}
                >
                  <BsTrash />
                </Button>
              </Flex>
            ))}

            <Button
              backgroundColor="transparent"
              border="1px solid #D9D9D9"
              _focus={{ shadow: 0 }}
              color="dark-blue"
              fontWeight="normal"
              onClick={handleAddInputDescription}
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
