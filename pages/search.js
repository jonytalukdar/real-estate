import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchApi, baseUrl } from '../utils/fetchApi';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';

import noresult from '../assets/images/noresult.svg';

const Search = ({ properties }) => {
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
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} alt="no result" />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
