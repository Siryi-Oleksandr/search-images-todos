import { useState, useEffect } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export function Gallery() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('pending');

    async function fetchData() {
      try {
        const data = await ImageService.getImages(query, page);

        // when bad request
        if (data.images.length === 0) {
          alert(`"${query}" not found!`);
          setImages([]);
          setStatus('not found');
          setTotalPages(0);
          return;
        }

        const handleImages = ImageService.handleFetchData(data.images);
        setImages(prevImages => [...prevImages, ...handleImages]);
        setStatus('resolved');
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error);
        setStatus('rejected');
        alert(`Something went wrong`);
        console.error(error);
      }
    }

    fetchData();
  }, [query, page]);

  const onSubmit = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const availablePages = totalPages > page;

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {status === 'pending' && <Text textAlign="center">Loading ... 🥱</Text>}

      <Grid>
        {images.map(({ id, avg_color, alt, src }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img src={src} alt={alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>

      {availablePages && (
        <Button type="buttom" onClick={onLoadMore}>
          Load more
        </Button>
      )}
      {images.length === 0 && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
}