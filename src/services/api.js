import axios from 'axios'

export const fetchDashboardData = async () => {
  const response = await axios.get('/data/dashboard.json')
  return response.data
}
