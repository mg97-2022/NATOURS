const mongoose = require('mongoose');
const dotenv = require('dotenv');
// must be used before app require
dotenv.config({ path: './config.env' });
const app = require('./app');

// mongoose
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DATABASE)
  .then((con) => {
    // console.log(con.connections);
    console.log('connection established');
  })
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
