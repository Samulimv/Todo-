import { pool } from '../helper/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helper/utils.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM task');
    res.status(200).json(emptyOrRows(result));
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  const { description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO task (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(200).json({ id: result.rows[0].id });
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await pool.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
});

export default router;
