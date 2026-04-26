import mongoose, { Schema, Document } from 'mongoose';

export interface ILevel extends Document {
  chapterId: mongoose.Types.ObjectId;
  title: string;
  type: 'material' | 'quiz';
  order: number;
}

const LevelSchema: Schema = new Schema({
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['material', 'quiz'], required: true },
  order: { type: Number, required: true },
});

export default mongoose.model<ILevel>('Level', LevelSchema);
