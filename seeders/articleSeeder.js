const { faker } = require("@faker-js/faker");
const { Article } = require("../models");
const { User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const articles = [];
  const users = [];

  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");

  const usersLoaded = await User.findAll();

  for (let i = 0; i < 5; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(5, "\n\n"),
      image: faker.image.abstract(1000, 1000, true),
      user_id: faker.datatype.number({ min: 1, max: 5 }),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
