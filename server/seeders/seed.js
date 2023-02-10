const db = require('../config/connection');
const { User, Prompt } = require('../models');
const userSeeds = require('./userSeeds.json');
const promptSeeds = require('./promptSeeds.json');

db.once('open', async () => {
  try {
    await prompt.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < promptSeeds.length; i++) {
      const { _id, prompt_____ } = await Prompt.create(promptSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: prompt____ },
        {
          $addToSet: {
            prompts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
