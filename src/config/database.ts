import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sharenet_workshops',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const initDatabase = async (): Promise<void> => {
  try {
    // Create Workshops Table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS workshops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        venue VARCHAR(255) NOT NULL,
        total_seats INT NOT NULL,
        seats_available INT NOT NULL,
        category VARCHAR(100) NOT NULL,
        status ENUM('AVAILABLE', 'SOLD_OUT') DEFAULT 'AVAILABLE'
      )
    `);

    // Create Workshop Bookings Table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS workshop_bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        workshop_id INT NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workshop_id) REFERENCES workshops(id)
      )
    `);

    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

export const seedWorkshops = async (): Promise<void> => {
  try {
    const [existingWorkshops] = await pool.execute('SELECT * FROM workshops');
    
    if ((existingWorkshops as any[]).length === 0) {
      await pool.execute(`
        INSERT INTO workshops 
        (title, date, venue, total_seats, seats_available, category, status) 
        VALUES 
        ('Investment Strategies Masterclass', '2024-06-15', 'Sandton Convention Centre', 50, 30, 'Finance', 'AVAILABLE'),
        ('Crypto and Blockchain Workshop', '2024-07-20', 'Online Webinar', 100, 0, 'Cryptocurrency', 'SOLD_OUT'),
        ('Stock Market Fundamentals', '2024-08-10', 'Cape Town Business Centre', 75, 45, 'Investment', 'AVAILABLE')
      `);
      console.log('Workshops seeded');
    }
  } catch (error) {
    console.error('Seeding workshops error:', error);
  }
};

export default pool;