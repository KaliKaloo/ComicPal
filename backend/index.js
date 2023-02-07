const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.Open_AI_Key,
});
const openai = new OpenAIApi(configuration);
const app = express();
const port = 3080;

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  res.json({
    data: response.data
  })
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
