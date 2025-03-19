import axios from 'axios';
import type { SpotPrice } from '@/interfaces/SpotPrice';

const API_BASE_URL = 'https://api.sharenet.co.za/api/v1/px2/spots';

export const spotService = {
  async fetchSpotPrices(): Promise<SpotPrice[]> {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE'
        }
      });
      return response.data.spots;
    } catch (error) {
      console.error('Error fetching spot prices:', error);
      return [];
    }
  }
};