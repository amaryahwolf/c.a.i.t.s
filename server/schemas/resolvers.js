const { AuthenticationError } = require('apollo-server-express');
const { User, Explanation } = require('../models');
const { signToken } = require('../utils/auth');
const openAi = require("../config/ai");


const resolvers = {
  Query: {
    //   Get user and all explanations associated with user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('explanations');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Create new explanation with AI
    addExplanation: async (parent, { question }, context) => {
      console.log("We are adding explanations!")
      // console.log(context)
      const response = await openAi.createCompletion({
        model: "code-davinci-002",
        prompt: `####Explain this code in plain English\n \n"""Code \n${question} \n"""Explanation`,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
      });

      console.log(response)

      // TODO: add conditional logic to only update user if user is logged in, else return

      const userData = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { explanations: { question, response: response.data.choices[0].text } } },
        { new: true }
      );
      console.log(response.data.choices[0].text)
      console.log(userData)

      return { response: response.data.choices[0].text }
    },

    // Delete a user's associated explanation
    removeExplanation: async (parent, { explanationId }, context) => {
      console.log("ExplID", explanationId)
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { explanations: { explanationId: explanationId } } },
            { new: true }
          );
          console.log("updatedUser", updatedUser);
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (error) {
        throw new AuthenticationError(error)
      }
    }
  }
};

module.exports = resolvers;