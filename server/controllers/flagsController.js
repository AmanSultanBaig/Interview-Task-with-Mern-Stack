const fs = require('fs');
const path = require('path');

const flagsFilePath = path.join(__dirname, '../config/flags.json');
let flagsData = require(flagsFilePath);

const reloadFlags = () => {
  try {
    delete require.cache[require.resolve(flagsFilePath)];
    flagsData = require(flagsFilePath);
    console.log('Flags reloaded successfully.');
  } catch (error) {
    console.error('Error reloading flags:', error);
  }
};

fs.watch(flagsFilePath, (eventType, filename) => {
  if (eventType === 'change') {
    reloadFlags();
  }
});

const evaluateFlags = (userId, region) => {
  const globalFlags = flagsData.global || {};
  const regionFlags = flagsData.regions?.[region] || {};
  const userFlags = flagsData.users?.[userId] || {};

  return {
    featureA: userFlags.featureA ?? regionFlags.featureA ?? globalFlags.featureA,
    featureB: userFlags.featureB ?? regionFlags.featureB ?? globalFlags.featureB
  };
};

module.exports = {
  evaluateFlags
};
