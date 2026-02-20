import { createSlice } from '@reduxjs/toolkit';

const loadProductsFromStorage = () => {
  try {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  } catch (error) {
    console.error('Ошибка загрузки товаров из localStorage:', error);
    return [];
  }
};

const initialState = {
  products: loadProductsFromStorage(),
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload || [];
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    addProduct: (state, action) => {
      if (action.payload) {
        state.products.push(action.payload);
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    updateProduct: (state, action) => {
      if (action.payload && action.payload.id) {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
          localStorage.setItem('products', JSON.stringify(state.products));
        }
      }
    },
    deleteProduct: (state, action) => {
      if (action.payload) {
        state.products = state.products.filter(p => p.id !== action.payload);
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetToApiProducts: (state, action) => {
      if (action.payload) {
        state.products = action.payload;
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
  },
});

export const { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  setLoading,
  setError,
  resetToApiProducts 
} = productsSlice.actions;

export default productsSlice.reducer;