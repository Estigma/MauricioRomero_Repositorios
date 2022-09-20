const path = require('path');
const fs = require('fs');

const basePathToData = path.join(__dirname, '../mockData/');

export const GetRepositoriesState = function () {
  var filename = path.join(basePathToData, 'repositoryState.json');
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
};