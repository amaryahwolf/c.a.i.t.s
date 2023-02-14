const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
