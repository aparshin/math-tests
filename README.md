# math-tests
Simple interactive math tests for children

### Build and deployment

  * `npm i`
  * `browserify -t [ babelify ] src/main.js -o bundle.js`
  * `browserify -t [ babelify ] stat.js -o stat_bundle.js`
  * Copy `config.json.example` to `config.json` and edit it correspondingly
  * Copy `users.json.example` to `users.json` and edit it correspondingly
  * `node server.js`
