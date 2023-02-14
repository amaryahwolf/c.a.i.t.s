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
        // TODO: connect route to Explanation model and grab user input(question) as prompt
        addExplanation: async (parent, { question }, context) => {
          console.log("We are adding explanations!")
          const response = await openAi.createCompletion({
          model: "code-davinci-002",
          prompt: question,
          temperature: 0,
          max_tokens: 64,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          stop: ["\"\"\""],
          });
          const explanationData = await Explanation.create({
            question,
            response: response.data.choices[0].text
          })
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { explanations: explanationData._id } }
          );
          console.log(response.data.choices[0].text)
          return {question, response: response.data.choices[0].text}
        },

        // Delete a user's associated explanation
        removeExplanation: async (parent, { _id }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { explanations: { _id } } },
              { new: true }
            );
            return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!');
        }
      }
};

module.exports = resolvers;