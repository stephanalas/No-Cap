/* eslint no-console: 'off' */

const app = require('./app');

const PORT = process.env.PORT || 3000;

const init = () => {
  try {
    app.listen(PORT, () => console.log(`now listening to port ${PORT}`));
  } catch (err) {
    console.log('error listening on port', err);
  }
};
init();
