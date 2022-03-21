import React, { useRef, useState } from 'react'
import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea,
  Flex
} from '@chakra-ui/react'
import Layout from '../../layout/admin'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { BsTrash } from 'react-icons/bs'
import { HeaderInfo } from '../../interfaces/HeaderInfo'

export type FileType = {
  lastModified: number
  lastModifiedDate?: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

interface AdminHeaderPageIprops {
  headerData: HeaderInfo
}

export const getServerSideProps: GetServerSideProps = async () => {
  const URL = process.env.URL_ROOT
  const responseHeader = await axios.get(`${URL}/api/header`)
  const data = await responseHeader.data

  return {
    props: {
      headerData: data?.data
    }
  }
}

const AdminHeaderPage: React.FC<AdminHeaderPageIprops> = ({ headerData }) => {
  const [data, setData] = useState(headerData)
  const [descriptionArray, setDescriptionArray] = useState(data.description)
  const [image, setImage] = useState<string | null>(data.image || null)
  const [fileImage, setFileImage] = useState<FileType | null | Blob>()
  const inputImgRef = useRef(null)

  const newInputDescription = {
    id: uuidv4(),
    text: ''
  }

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newInputDescription])
  }

  const handleDeleteInputDescription = id => {
    const newInputDescription = descriptionArray.filter(item => item.id !== id)
    setDescriptionArray(newInputDescription)
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleUpdateHeader = async () => {
    const headerInfo = {
      title: data.title,
      description: descriptionArray,
      image
    }

    try {
      const URL = process.env.URL_ROOT_LOCAL || process.env.URL_ROOT
      const response = await fetch(`${URL}/api/header`, {
        method: 'PUT',
        body: JSON.stringify(headerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
      return null
    }
  }

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
              value={data.title}
              onChange={e => setData({ ...data, title: e.target.value })}
            />
          </Box>

          <Box marginBottom="1.5rem">
            <Button
              backgroundColor="transparent"
              border="1px solid #D9D9D9"
              onClick={() => inputImgRef.current.click()}
              _focus={{ shadow: 0 }}
              color="dark-blue"
              fontWeight="normal"
            >
              Change image
            </Button>
            <Input
              ref={inputImgRef}
              type="file"
              onChange={handleChangeImage}
              display="none"
            />
          </Box>

          <Box marginBottom="2rem">
            <Image
              src={image}
              alt={data.title}
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

          <Button
            backgroundColor="dark-blue"
            marginTop="1.5rem"
            rounded="4px"
            color="white"
            fontWeight="semibold"
            padding="0.75rem 2rem"
            onClick={handleUpdateHeader}
          >
            Update Info
          </Button>
        </Box>
      </Layout>
    </Box>
  )
}

export default AdminHeaderPage
