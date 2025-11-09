import { AppDispatch, AppState } from 'src/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProperties } from 'src/redux/slices/getPropertiesSlice';
import { Box, Button, Card, Modal } from '@mui/material';
import PropertyCard from 'src/components/PropertyCard/PropertyCard';
import HouseIcon from '@mui/icons-material/House';
import AddIcon from '@mui/icons-material/Add';

const Properties = () => {
  const dispatch: AppDispatch = useDispatch();

  const { properties, loading, error } = useSelector(
    (state: AppState) => state.properties
  );

  console.log('properties', properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
          gap: 2,
          marginTop: 4,
          padding: 2
        }}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            address={property.address}
            createdAt={property.createdAt}
            rent={property.rent}
            tenant={property.tenant}
          />
        ))}
        <Card
          sx={{
            maxWidth: 345,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            size="large"
            startIcon={
              <>
                <AddIcon /> <HouseIcon />
              </>
            }
            sx={{
              height: '100%',
              width: '100%',
              fontSize: '1.2rem'
            }}
          >
            {/* <HouseIcon /> */}
          </Button>
        </Card>
      </Box>
      <Modal>{/* Modal content for adding a new property */}</Modal>
    </>
  );
};

export default Properties;
