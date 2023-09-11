const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    medicine: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    numberOfTime: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

noteSchema.virtual("timeArray").get(function () {
  let count = 0;
  let hour = new Date(startTime).getHours();
  let date = new Date(startTime).getTime() - hour * 3600 * 1000;
  let time;

  let timeArray = [];

  for (i = 0; i < this.total; i++) {
    if (count === this.numberOfTime || hour > 21) {
      count = 0;
      hour = 8;
      date += 24 * 3600 * 1000;
    }

    time = date + hour * 3600 * 1000;

    timeArray.push(time);

    hour += this.period;
    count += 1;
  }

  return timeArray;
});

const Note = model("Note", noteSchema);

module.exports = Note;
