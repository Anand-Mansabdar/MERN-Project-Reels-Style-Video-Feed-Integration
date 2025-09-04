const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
})