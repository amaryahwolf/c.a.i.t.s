const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
