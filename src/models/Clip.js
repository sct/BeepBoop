import mongoose, { Schema } from 'mongoose';

const ClipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true},
  created: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  private: Boolean,
  filename: String,
  deleted: Boolean,
  global: Boolean,
  meta: {
    favs: Number,
  },
});

const Clip = mongoose.model('Clip', ClipSchema);

export default Clip;
