import app from "./src/app";
import "dotenv/config";

const Port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`AI server is running on port: ${Port}`);
});
