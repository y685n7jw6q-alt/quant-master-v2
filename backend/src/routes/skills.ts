import { Router } from 'express';
import { skillController } from '../controllers/skillController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => skillController.getAllSkills(req, res));
router.get('/:id', (req, res) => skillController.getSkillById(req, res));
router.post('/', authenticateToken, (req, res) => skillController.createSkill(req, res));
router.put('/:id', authenticateToken, (req, res) => skillController.updateSkill(req, res));

export default router;
