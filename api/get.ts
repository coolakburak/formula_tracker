import axios from 'axios';
import { baseUrl } from '~/config/config';
import { CircuitRoot } from '~/types/circuits.types';

// Driver Ranking Types
import { DriverRanking, Root } from '~/types/driverRanking.types';

// Driver Details Types
import { DriverDetail, DetailRoot } from '~/types/driverDetails.types';

const API_KEY = process.env.EXPO_PUBLIC_FORMULA_API_KEY;
const API_HOST = 'api-formula-1.p.rapidapi.com';

export const fetchDrivers = async (): Promise<Root | undefined> => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/rankings/drivers`,
    params: { season: '2023' },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };
  try {
    const response = await axios.request<Root>(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCircuits = async (): Promise<CircuitRoot | undefined> => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/circuits`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };
  try {
    const response = await axios.request<CircuitRoot>(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchCircuitsById = async (id: string): Promise<CircuitRoot | undefined> => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/circuits`,
    params: { id },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };
  try {
    const response = await axios.request<CircuitRoot>(options);

    return response.data;
  } catch (error) {
    throw error;
  }

}

export const fetchDriverById = async (id: string): Promise<DetailRoot | undefined> => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/drivers`,
    params: { id },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };

  try {
    const response = await axios.request<DetailRoot>(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
