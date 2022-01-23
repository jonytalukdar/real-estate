import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { filterData, getFilterValues } from '../utils/filterData';

import {
  Flex,
  Box,
  Select,
  Input,
  Spinner,
  Icon,
  Button,
  Text,
} from '@chakra-ui/react';
import { MdCancel } from 'react-icons/md';

const SearchFilters = () => {
  const [filters, setFilteres] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filtererValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filtererValues);

    values.forEach((item) => {
      query[item.name] = item.value;
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex flexWrap="wrap" p="4" justifyContent="center">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item, i) => (
              <option value={item.value} key={i}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
