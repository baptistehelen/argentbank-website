import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signInUser = createAsyncThunk(
  'signIn/signInUser',
  async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Impossible de se connecter');
      }
      
      const data = await response.json();
      
      console.log('Connexion réussie !', data); // Afficher un message de succès dans la console
      return { user: data, redirectTo: '/profile' };
    } catch (error) {
      console.error('Erreur de connexion :', error); // Afficher une erreur dans la console en cas d'échec
      throw error;
    }
  }
);



const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
      user: null,
      error: null,
    },
    reducers: {
      clearError: state => {
        state.error = null;
      },
    },
    extraReducers: builder => {
      builder
        .addCase(signInUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.error = null;
        })
        .addCase(signInUser.rejected, (state, action) => {
          state.user = null;
          state.error = action.error.message;
        });
    },
  });

export const { clearError } = signInSlice.actions;

export default signInSlice.reducer;