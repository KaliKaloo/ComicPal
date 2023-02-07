import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.VITE_Open_AI_Key,
});
const openai = new OpenAIApi(configuration);

async function callAPI() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
}

callAPI()