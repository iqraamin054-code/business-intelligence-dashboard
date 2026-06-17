
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/db`)
    return response.data
  } catch (error) {
    console.warn('Mock API unreachable, falling back to static data:', error.message)
    const fallback = await axios.get('/data/dashboard.json')
    return fallback.data
  }
}