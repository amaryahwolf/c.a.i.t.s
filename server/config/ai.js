const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
