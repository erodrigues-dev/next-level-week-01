import express from 'express';

const app = express();

app.get("/hello", (req, res) => {
  return res.json({ msg: "Hello Rocket" });
});

app.listen(3333, () => console.log("listen on port 3333"));
