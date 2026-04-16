const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: false, min: 0 },
    happenedAt: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);