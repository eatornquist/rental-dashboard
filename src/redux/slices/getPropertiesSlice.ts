import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CREATE_PROPERTY,
  DELETE_PROPERTY,
  GET_PROPERTIES,
  GET_PROPERTY_BY_ID,
  UPDATE_PROPERTY
} from 'src/utils/api-routes';
import instance from 'src/utils/axios-instance';

interface Property {
  id: number;
  address: string;
  rent: number;
  tenantId?: number;
  tenant?: {
    id: number;
    name: string;
    email?: string;
  };
  contract?: Array<{
    id: number;
  }>;
}

export interface PropertiesState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async () => {
    const response = await instance.get(GET_PROPERTIES);
    return response.data;
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchOne',
  async (id: number) => {
    const response = await instance.get(GET_PROPERTY_BY_ID(id));
    return response.data;
  }
);

export const createProperty = createAsyncThunk(
  'properties/create',
  async (property: Omit<Property, 'id'>) => {
    const response = await instance.post(CREATE_PROPERTY, property);
    return response.data;
  }
);

export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({ id, data }: { id: number; data: Partial<Property> }) => {
    const response = await instance.patch(UPDATE_PROPERTY(id), data);
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id: number) => {
    await instance.delete(DELETE_PROPERTY(id));
    return id;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      })
      // Fetch single property
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.selectedProperty = action.payload;
        state.error = null;
      })
      // Create property
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
        state.error = null;
      })
      // Update property
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.properties.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.selectedProperty = action.payload;
        state.error = null;
      })
      // Delete property
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          (item) => item.id !== action.payload
        );
        if (state.selectedProperty?.id === action.payload) {
          state.selectedProperty = null;
        }
        state.error = null;
      });
  }
});

export const { clearSelectedProperty, clearError } = propertiesSlice.actions;
export const propertiesReducer = propertiesSlice.reducer;
