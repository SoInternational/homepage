#!/usr/bin/env node
/* global __dirname */
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const remarkParse = require('remark-parse');
const unified = require('unified');

module.exports = () => {
  const postsRoot = path.resolve(__dirname, '../public/posts');
  const files = fs
    .readdirSync(postsRoot)
    .reduce((acc, filename) => {
      const match = filename.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-(.*).md$/);

      if (!match) return acc;

      const mdText = fs.readFileSync(path.resolve(postsRoot, filename), 'utf-8');
      const mdAst = unified().use(remarkParse).parse(mdText);
      const image = findImageUrl(mdAst);

      let year = Number.parseInt(match[1], 10);

      if (year < 1000) year += 2000;

      const month = `0${match[2]}`.slice(-2);
      const day = `0${match[3]}`.slice(-2);
      const title = qs.unescape(match[4].replaceAll(/-+/g, ' '));

      return [
        ...acc,
        {
          key: `${year}${month}${day}${title.toLowerCase()}`,
          value: {
            title,
            image,
            year,
            month: Number.parseInt(month, 10),
            day: Number.parseInt(day, 10),
            filename,
          },
        },
      ];
    }, [])
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((entry) => entry.value);

  fs.writeFileSync(path.resolve(postsRoot, 'index.json'), JSON.stringify(files, null, '  '));

  function findImageUrl({ children = [], type, url }) {
    if (type === 'image') {
      return url;
    }

    for (const child of children) {
      url = findImageUrl(child);

      if (url) {
        return url;
      }
    }
  }
};
