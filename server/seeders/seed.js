const db = require('../config/connection');
const { User, Prompt } = require('../models');
const userSeeds = require('./userSeeds.json');
const promptSeeds = require('./promptSeeds.json');

db.once('open', async () => {
  try {
    await Prompt.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Prompt.create(promptSeeds)

  console.log('all done!');
  process.exit(0);
});
