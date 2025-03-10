const app = require("./");
const { connectDb } = require("./config/db");
const PORT = process.env.PORT || 5454;
app.listen(PORT, async () => {
  await connectDb();
  console.log("e-commerce API Listening on PORT:", PORT);
});
