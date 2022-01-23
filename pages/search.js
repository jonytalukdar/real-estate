import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';

const Search = () => {
  const [searchFilter, setSearchFilter] = useState(false);

  const router = useRouter();

  return (
    <Box>
      <Flex
        p="2"
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.200"
        fontWeight="black"
        fontSize="lg"
        onClick={() => setSearchFilter((prevState) => !prevState)}
      >
        <Text>Search Property by Filters</Text>
        <Icon paddingLeft="2" w="8">
          <BsFilter />
        </Icon>
      </Flex>
      {!searchFilter && <SearchFilters />}
      <Text p="4" fontSize="2xl" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      {[].map((property) => (
        <Property property={property} key={property.id} />
      ))}
    </Box>
  );
};

export default Search;
