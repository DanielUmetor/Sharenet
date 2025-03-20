export interface Workshop {
    id?: number;
    title: string;
    date: string;
    venue: string;
    total_seats: number;
    seats_available: number;
    category: string;
    status: 'AVAILABLE' | 'SOLD_OUT';
  }
  
  export interface WorkshopBooking {
    id?: number;
    workshop_id: number;
    user_email: string;
    booking_date?: Date;
  }