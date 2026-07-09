import { Router } from 'express';
import { questionController } from '../controllers/questionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => questionController.getQuestions(req, res));
router.get('/:id', (req, res) => questionController.getQuestionById(req, res));
router.post('/', authenticateToken, (req, res) => questionController.createQuestion(req, res));
router.post('/submit', authenticateToken, (req, res) => questionController.submitAnswer(req, res));

export default router;
