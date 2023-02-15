const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
