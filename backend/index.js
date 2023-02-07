const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.Open_AI_Key,
});
const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 50,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
