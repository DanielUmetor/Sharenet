import express, { Request, Response, NextFunction } from 'express';
import { getAllWorkshops, bookWorkshop } from '../controllers/workshopController.js';

const router = express.Router();

// Async route handler wrapper
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.get('/', asyncHandler(getAllWorkshops));
router.post('/book', asyncHandler(bookWorkshop));

export default router;