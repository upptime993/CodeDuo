import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial extends Document {
  levelId: mongoose.Types.ObjectId;
  content: string; // HTML or text content
}

const MaterialSchema: Schema = new Schema({
  levelId: { type: Schema.Types.ObjectId, ref: 'Level', required: true },
  content: { type: String, required: true },
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);
