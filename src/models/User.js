import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true},
  avatar: String,
  accessToken: { type: String, required: true },
  created: { type: Date, default: Date.now },
  guilds: Array,
  deleted: Boolean,
});

const User = mongoose.model('User', UserSchema);

export default User;
