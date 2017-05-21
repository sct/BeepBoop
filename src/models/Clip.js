import mongoose from 'mongoose';

const ClipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true},
  created: { type: Date, default: Date.now },
  private: Boolean,
  uploaded: Boolean,
  deleted: Boolean,
  global: Boolean,
  meta: {
    favs: Number,
  },
});

const Clip = mongoose.model('Clip', ClipSchema);

export default Clip;
