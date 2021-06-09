#!/usr/bin/env node
/* global __dirname */
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const postsRoot = path.resolve(__dirname, '../docs/backgrounds');
  const files = fs.readdirSync(postsRoot).reduce((acc, filename) => {
    return /\.(jpe?g|png)$/.test(filename) ? [...acc, filename] : acc;
  }, []);

  fs.writeFileSync(path.resolve(postsRoot, 'index.json'), JSON.stringify(files, null, '  '));
};
