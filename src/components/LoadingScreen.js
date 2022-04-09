import React from 'react';
import {Box, Heading, Spinner} from 'native-base';

export default function LoadingScreen({title}) {
  return (
    <Box
      zIndex={1}
      position="absolute"
      flex={1}
      w="full"
      h="full"
      justifyContent="center"
      alignItems="center">
      <Box
        borderRadius="xl"
        p="5"
        position="absolute"
        flexDir="row"
        bgColor="white"
        justifyContent="center">
        <Spinner size="lg" color="warning.500" mr="3" />
        <Heading>{title || 'Loading...'}</Heading>
      </Box>
    </Box>
  );
}
