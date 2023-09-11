const { AuthenticationError } = require("apollo-server-express");
const { User, Note } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "savedNotes"
        );

        return userData;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    notes: async (parent, args, context) => {
      if (context.user) {
        const notes = await Note.find({ userId: context.user._id });

        return notes;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addNote: async (parent, { noteData }, context) => {
      console.log("I am now in addNote.");

      if (context.user) {
        const { title, medicine, startTime, period, numberOfTime, total } =
          noteData;
        const note = await Note.create({
          title: title,
          medicine: medicine,
          startTime: startTime,
          period: period,
          numberOfTime: numberOfTime,
          total: total,
          userId: context.user._id,
        });

        try {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedNotes: note._id } },
            { new: true, runValidators: true }
          ).populate("savedNotes");

          return user;
        } catch (err) {
          throw new AuthenticationError(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeNote: async (parent, { noteId }, context) => {
      if (context.user) {
        const note = await Note.findOneAndDelete({
          _id: noteId,
          userId: context.user._id,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedNotes: note._id,
            },
          }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
