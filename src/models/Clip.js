import mongoose from 'mongoose';

const ClipSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: { type: Date, default: Date.now },
  private: Boolean,
  meta: {
    favs: Number,
  },
});

const Clip = mongoose.model('Clip', ClipSchema);

export default Clip;