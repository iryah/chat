const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `You are an English tutor: ${message}`,
    max_tokens: 150,
  });
  res.json({ reply: completion.data.choices[0].text });
});

app.listen(3000, () => console.log('Server running on port 3000'));

