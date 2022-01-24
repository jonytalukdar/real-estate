import React, { useContext } from 'react';
import Image from 'next/image';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Flex, Icon } from '@chakra-ui/react';

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function ImageScrollbar({ data }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          key={item.id}
          width="910px"
          itemId={item.id}
          overflow="hidden"
          p="1"
        >
          <Image
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            width={1000}
            height={500}
            sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
            alt="photo"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      justifyContent="center"
      alignItems="center"
      marginRight="1"
    >
      <Icon
        as={FaArrowAltCircleLeft}
        fontSize="2xl"
        cursor="pointer"
        d={['none', 'none', 'none', 'block']}
      />
    </Flex>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Flex
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      justifyContent="center"
      alignItems="center"
      marginLeft="1"
    >
      <Icon
        as={FaArrowAltCircleRight}
        fontSize="2xl"
        cursor="pointer"
        d={['none', 'none', 'none', 'block']}
      />
    </Flex>
  );
}

export default ImageScrollbar;
