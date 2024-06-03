const English = require("../models/english");
const Tamil = require("../models/tamil");
const Bilingual = require("../models/bilingual");

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
