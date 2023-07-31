import { Configuration, OpenAIApi } from 'openai';
import { process } from './env';
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
// const configuration = new Configuration({
//   apiKey: import.meta.env.VITE_API_KEY,
// });

const openai = new OpenAIApi(configuration);

export const apiCall = async ({ model, prompt, max_tokens, temperature }) => {
  try {
    const response = await openai.createCompletion({
      model,
      prompt,
      max_tokens,
      temperature,
    });
    return response.data.choices[0]?.text || '';
  } catch (error) {
    console.error('Error while calling OpenAI API', error);
    throw error;
  }
};
