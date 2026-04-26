import { Router } from 'express';
import { importData, getChapters, getChapterLevels, getLevelContent } from '../controllers/adminController.js';

const router = Router();

// Admin routes
router.post('/admin/import', importData);

// Public/App routes
router.get('/chapters', getChapters);
router.get('/chapters/:chapterId/levels', getChapterLevels);
router.get('/levels/:levelId/content', getLevelContent);

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
