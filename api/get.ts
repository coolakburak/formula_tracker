import axios from 'axios';
import { baseUrl } from '~/config/config';
import { Root } from '~/types/driverRanking.types';

const API_KEY = process.env.EXPO_PUBLIC_FORMULA_API_KEY;
const API_HOST = 'api-formula-1.p.rapidapi.com';

const options = {
  method: 'GET',
  url: `${baseUrl}/rankings/drivers`,
  params: { season: '2023' },
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
};

export const fetchDrivers = async (): Promise<Root | undefined> => {
  try {
    const response = await axios.request<Root>(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
