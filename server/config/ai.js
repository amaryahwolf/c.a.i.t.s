const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
