import React from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';

import {
  useGetExamplePostsQuery,
  useGetExpensesQuery,
} from '../store/services';

export const Home = () => {
  const { data, isLoading } = useGetExamplePostsQuery();

  useGetExpensesQuery();

  return (
    <Container maxWidth="lg">
      {data === undefined && isLoading && <>loading...</>}

      {data?.length &&
        data.map((post: any) => <Box key={post.id}>{post.title}</Box>)}
    </Container>
  );
};
