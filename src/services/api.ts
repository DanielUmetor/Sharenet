import axios from 'axios';
import type { SpotPrice } from '@/interfaces/SpotPrice';

const API_BASE_URL = 'https://api.sharenet.co.za/api/v1/px2/spots';

export const spotService = {
  async fetchSpotPrices(): Promise<{ data: SpotPrice[], error: string | null }> {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          // You may need to add appropriate authentication
          'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
        timeout: 10000
      });
      return { 
        data: response.data.spots, 
        error: null 
      };
    } catch (error) {
      console.error('Error fetching spot prices:', error);
      return { 
        data: [], 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  }
};

// Workshop Interface
export interface Workshop {
  id: number;
  title: string;
  date: string;
  venue: string;
  categoryName: string;
  soldOut: boolean;
  seatsAvailable: number;
}

export const workshopService = {
  async fetchWorkshops(spotPrices: SpotPrice[]): Promise<Workshop[]> {
    // Transform spot prices into workshops
    return spotPrices.map((spot, index) => ({
      id: index + 1,
      title: `${spot.fullName} Workshop`,
      date: new Date(spot.datetime).toISOString().split('T')[0],
      venue: `Venue in ${spot.categoryName}`,
      categoryName: spot.categoryName,
      soldOut: index % 3 === 0, // Every third workshop is sold out
      seatsAvailable: Math.max(0, Math.floor(Math.random() * 20)) // Random seats, minimum 0
    }));
  }
};