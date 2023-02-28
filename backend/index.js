const { Configuration, OpenAIApi } = require("openai");
const home = require("./home");
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

app.use("/", home);

app.post("/story", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
      frequency_penalty: 0.4,
    });
    res.status(200).json({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.post("/image", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1, // number of images to generate
      size: "512x512",
    });
    res.status(200).json({
      url: response.data.data[0].url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
