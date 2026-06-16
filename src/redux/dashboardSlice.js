import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDashboardData } from '../services/api'

// Async thunk to fetch dashboard data
export const getDashboardData = createAsyncThunk(
  'dashboard/getDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchDashboardData()
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Failed to fetch dashboard data')
    }
  }
)

const initialState = {
  kpis: [],
  revenueData: [],
  salesData: [],
  customerData: [],
  categoryData: [],
  customers: [],
  loading: false,
  error: null,
  dataFetched: false,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.kpis = action.payload.kpis || []
        state.revenueData = action.payload.revenueData || []
        state.salesData = action.payload.salesData || []
        state.customerData = action.payload.customerData || []
        state.categoryData = action.payload.categoryData || []
        state.customers = action.payload.customers || []
        state.dataFetched = true
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message || 'Something went wrong'
        state.dataFetched = true
      })
  },
})

export default dashboardSlice.reducer
