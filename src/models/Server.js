import mongoose, { Schema } from 'mongoose';

const ServerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const Server = mongoose.model('Server', ServerSchema);

export default Server;
