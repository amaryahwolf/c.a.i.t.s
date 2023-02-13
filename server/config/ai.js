const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
