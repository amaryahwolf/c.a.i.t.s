const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
