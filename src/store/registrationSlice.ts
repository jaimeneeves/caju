import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from '~/api/axios-config';

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
};

type RegistrationState = {
  registrations: Registration[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: RegistrationState = {
  registrations: [],
  status: 'idle',
  error: null,
};

export const fetchRegistrations = createAsyncThunk(
  'registrations/fetchRegistrations',
  async (cpf?: string) => {
    const response = await axios.get('/registrations', {
      params: cpf ? { cpf } : {},
    });
    return response.data as Registration[];
  }
);

export const updateRegistrationStatus = createAsyncThunk(
  'registrations/updateRegistrationStatus',
  async (data: Registration, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/registrations/${data.id}`, data);
      return response.data as Registration;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const deleteRegistration = createAsyncThunk(
  'registrations/deleteRegistration',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/registrations/${id}`);
      return id;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegistrations.fulfilled, (state, action: PayloadAction<Registration[]>) => {
        state.status = 'idle';
        state.registrations = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateRegistrationStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRegistrationStatus.fulfilled, (state, action: PayloadAction<Registration>) => {
        state.status = 'idle';
        state.registrations = state.registrations.map((registration) =>
          registration.id === action.payload.id ? action.payload : registration
        );
      })
      .addCase(updateRegistrationStatus.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteRegistration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRegistration.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'idle';
        state.registrations = state.registrations.filter(registration => registration.id !== action.payload);
      })
      .addCase(deleteRegistration.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default registrationSlice.reducer;
