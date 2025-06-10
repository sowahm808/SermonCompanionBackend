const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    theme: { type: String },
    length: { type: Number, required: true },
    content: { type: String, required: true },
    scriptures: { type: Array },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

sermonSchema.index({ user_id: 1, createdAt: -1 });

module.exports = mongoose.model('Sermon', sermonSchema);
