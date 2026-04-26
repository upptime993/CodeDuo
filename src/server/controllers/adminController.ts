import { Request, Response } from 'express';
import Chapter from '../models/Chapter.js';
import Level from '../models/Level.js';
import Material from '../models/Material.js';
import Quiz from '../models/Quiz.js';

export const importData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { chapters } = req.body;

    if (!chapters || !Array.isArray(chapters)) {
      res.status(400).json({ error: 'Invalid JSON structure. Expected a "chapters" array.' });
      return;
    }

    await Chapter.deleteMany({});
    await Level.deleteMany({});
    await Material.deleteMany({});
    await Quiz.deleteMany({});

    for (const chapterData of chapters) {
      const chapter = new Chapter({
        title: chapterData.title,
        description: chapterData.description,
        order: chapterData.order,
      });
      await chapter.save();

      if (chapterData.levels && Array.isArray(chapterData.levels)) {
        for (const levelData of chapterData.levels) {
          const level = new Level({
            chapterId: chapter._id,
            title: levelData.title,
            type: levelData.type,
            order: levelData.order,
          });
          await level.save();

          if (levelData.type === 'material' && levelData.material) {
            const material = new Material({
              levelId: level._id,
              content: levelData.material.content,
            });
            await material.save();
          } else if (levelData.type === 'quiz' && levelData.quiz) {
            const quiz = new Quiz({
              levelId: level._id,
              question: levelData.quiz.question,
              options: levelData.quiz.options,
              correctAnswer: levelData.quiz.correctAnswer,
            });
            await quiz.save();
          }
        }
      }
    }

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: 'Internal server error during import' });
  }
};

export const getChapters = async (req: Request, res: Response): Promise<void> => {
  try {
    const chapters = await Chapter.find().sort({ order: 1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
};

export const getChapterLevels = async (req: Request, res: Response): Promise<void> => {
  try {
    const { chapterId } = req.params;
    const levels = await Level.find({ chapterId }).sort({ order: 1 });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch levels' });
  }
};

export const getLevelContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { levelId } = req.params;
    const level = await Level.findById(levelId);

    if (!level) {
      res.status(404).json({ error: 'Level not found' });
      return;
    }

    let content;
    if (level.type === 'material') {
      content = await Material.findOne({ levelId });
    } else if (level.type === 'quiz') {
      content = await Quiz.findOne({ levelId });
    }

    res.json({ level, content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch level content' });
  }
};
