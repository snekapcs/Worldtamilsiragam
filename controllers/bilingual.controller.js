const English = require("../models/English");
const Tamil = require("../models/Tamil");
const Bilingual = require("../models/Bilingual");

const createBilingualContent = async () => {
  try {
    // Create English content with default values
    const englishContent = new English({});
    await englishContent.save();

    // Create Tamil content with default values
    const tamilContent = new Tamil({});
    await tamilContent.save();

    // Create bilingual content referencing English and Tamil content
    const bilingualContent = new Bilingual({
      englishContent: englishContent._id,
      tamilContent: tamilContent._id,
    });
    await bilingualContent.save();

    console.log("Bilingual content created successfully!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createBilingualContent,
};
