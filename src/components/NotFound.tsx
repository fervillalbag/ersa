import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const NotFound: React.FC = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" fontWeight="bold" fontSize="32px">
        Error 404
      </Text>
    </Flex>
  )
}

export default NotFound
