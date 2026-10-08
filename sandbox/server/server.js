import app from './src/app.js';
import {connectToDb} from "./src/configs/db.js"

connectToDb()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sandboxserver is running on port ${PORT}`);
});