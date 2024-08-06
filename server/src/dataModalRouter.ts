import { Router, Request, Response } from 'express';
import DataModel from './dataModal';

const router = Router();

router.get('/data', async (req: Request, res: Response) => {
    try {
        const { age, gender, startDate, endDate } = req.query;
        console.log('fffff',age)

        // Build the query object
        const query: any = {};

        if (age && typeof age === 'string') {
            query.Age = age;
        }

        if (gender && typeof gender === 'string') {
            query.Gender = new RegExp(`^${gender}$`, 'i'); // Case-insensitive regex
        }

        if (startDate || endDate) {
            const dateRangeQuery: any = {};

            if (startDate && typeof startDate === 'string') {
                dateRangeQuery.$gte = startDate;
            }

            if (endDate && typeof endDate === 'string') {
                dateRangeQuery.$lte = endDate;
            }

            query.Day = dateRangeQuery;
        }

        console.log('fffff', query)
        // Fetch data from the database
        const data = await DataModel.find(query);

        // Fetch data from the database

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;