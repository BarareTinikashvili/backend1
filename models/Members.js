import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  deathYear: { type: Number },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
  generation: { type: Number, required: true },
  isHighlighted: { type: Boolean, default: false }
});

export const Member = mongoose.model('Member', memberSchema);