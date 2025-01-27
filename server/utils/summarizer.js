const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const summarizeText = async (text) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Summarize this news article in 2-3 sentences: ${text}`,
            max_tokens: 150,
            temperature: 0.5,
        });
        
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error summarizing text:', error);
        return text.substring(0, 200) + '...'; // Fallback to simple truncation
    }
};

module.exports = summarizeText; 