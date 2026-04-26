import mongoose, { Schema, Document } from 'mongoose';

export interface IChapter extends Document {
  title: string;
  description: string;
  order: number;
}

const ChapterSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true, unique: true },
});

export default mongoose.model<IChapter>('Chapter', ChapterSchema);
