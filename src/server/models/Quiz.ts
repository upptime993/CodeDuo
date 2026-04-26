import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  levelId: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuizSchema: Schema = new Schema({
  levelId: { type: Schema.Types.ObjectId, ref: 'Level', required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
