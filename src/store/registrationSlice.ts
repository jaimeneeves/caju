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
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/registrations/${id}`, { status });
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
      .addCase(updateRegistrationStatus.fulfilled, (state, action: PayloadAction<Registration>) => {
        state.registrations = state.registrations.map(registration =>
          registration.id === action.payload.id ? action.payload : registration
        );
      });
  },
});

export default registrationSlice.reducer;
