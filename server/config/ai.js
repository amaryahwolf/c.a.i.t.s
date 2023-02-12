const { Configuration, OpenAIApi } = require("openai");

// Import OpenAI node package, creating connection to API, and exporting to the rest of the application.
const configuration = new Configuration({
  apiKey: sk - AXsPpJHeexXu9ZQq3otDT3BlbkFJu8c5iMvDi0ClhtExoPiM,
});
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
