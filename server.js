const dotenv = require('dotenv');
// must be used before app require
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
