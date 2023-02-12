const { AuthenticationError } = require('apollo-server-express');
const { User, Prompt } = require('../models');
const { signToken } = require('../utils/auth');
const openAi = require("../config/ai");

// Develop AI persona with prompt for initial user prompt
let aiPrompt = 'I am a software developer interested in developing my coding skills through coding practice questions.';

const resolvers = {
    Query: {
    //   Explain: user getting their own prompts. save delete
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('prompts');
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

        addPrompt: async (parent, { difficulty, language, topic }, context) => {
          if (context.user) {
            const prompt = await Prompt.create({
              difficulty,
              language,
              topic
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { prompts: prompt._id } }
            );
    
            return prompt;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    },
}