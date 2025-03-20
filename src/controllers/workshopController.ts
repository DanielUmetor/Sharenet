import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { Workshop, WorkshopBooking } from '../models/Workshop';

export const getAllWorkshops = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { available } = req.query;
    
    let query = 'SELECT * FROM workshops';
    if (available === 'true') {
      query += ' WHERE status = "AVAILABLE"';
    }

    const [workshops] = await pool.execute(query);
    res.json(workshops);
  } catch (error) {
    next(error);
  }
};

export const bookWorkshop = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  const { workshop_id, user_email }: WorkshopBooking = req.body;

  if (!workshop_id || !user_email) {
    res.status(400).json({ error: 'Workshop ID and user email are required' });
    return;
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Lock and check workshop
    const [workshops] = await connection.execute(
      'SELECT * FROM workshops WHERE id = ? FOR UPDATE', 
      [workshop_id]
    );

    const workshop = (workshops as Workshop[])[0];

    if (!workshop) {
      await connection.rollback();
      res.status(404).json({ error: 'Workshop not found' });
      return;
    }

    if (workshop.seats_available <= 0 || workshop.status === 'SOLD_OUT') {
      await connection.rollback();
      res.status(400).json({ error: 'No seats available' });
      return;
    }

    // Reduce available seats
    const newSeatsAvailable = workshop.seats_available - 1;
    const newStatus = newSeatsAvailable === 0 ? 'SOLD_OUT' : 'AVAILABLE';

    await connection.execute(
      'UPDATE workshops SET seats_available = ?, status = ? WHERE id = ?', 
      [newSeatsAvailable, newStatus, workshop_id]
    );

    // Record booking
    await connection.execute(
      'INSERT INTO workshop_bookings (workshop_id, user_email) VALUES (?, ?)', 
      [workshop_id, user_email]
    );

    await connection.commit();

    res.status(201).json({ 
      message: 'Workshop booked successfully',
      workshop: {
        id: workshop.id,
        title: workshop.title,
        seats_remaining: newSeatsAvailable,
        status: newStatus
      }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};