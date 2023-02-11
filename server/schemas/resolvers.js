const { AuthenticationError } = require('apollo-server-express');
const { User, Prompt } = require('../models');
const { signToken } = require('../utils/auth');
const openAi = require("../config/ai");

// Develop AI persona with prompt for initial user prompt
let aiPrompt = 'I am a software developer interested in developing my coding skills through coding practice questions.';

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('prompts');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('prompts');
      },
      // Trying to get all prompts form user. Do we still need this?
      prompts: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Prompt.find(params);
      },
      // Single prompt
      prompt: async (parent, { promptId }) => {
        return Prompt.findOne({ _id: promptId });
      },
      // Explain
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
        // Should we start to create AI routes here through prompts
        // making the prompts, saving  and deleting 
        // CREATE routes with:
        // prompt += req.body.difficulty
        // prompt += req.body.topic
        // prompt += req.body.language

        // router.post("/makesuggestion", withAuth, async (req, res) => {
        //   try {
        //     prompt += req.body.ingredients;
        //     prompt += req.body.restrictions;
        //     prompt += req.body.detailsToConfirm;
        //     let suggestionData = await openAi.createCompletion({
        //       model: "text-davinci-003",
        //       prompt: prompt,
        //       max_tokens: 1000,
        //       temperature: 0.7,
        //     });
        //     const suggestion = suggestionData.data.choices[0].text;
        //     res.status(200).json({ suggestion });
        //   } catch (err) {
        //     res.status(500).json(err);
        //   }
        // });

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