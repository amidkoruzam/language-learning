import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import base64 from "base64-js";

export default defineEventHandler(async (event) => {
  const { keyWords } = await readBody(event);

  const text = await getText({ keywords: keyWords });
  const audio = await getTextAudio(text);

  if (!audio) {
    return { error: true, audio: null };
  }

  const str = typeof audio === "string" ? audio : base64.fromByteArray(audio);

  return { error: false, text, audio: str };
});

async function getText({ keywords }: { keywords: string }) {
  const userText = `
        Generate text in turkish. Use A1 lexic. Keywords: ${keywords}. 
        Max - 300 symbols.
    `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }],
    }),
  }).then((res) => res.json());

  return response.choices[0].message.content;
}

async function getTextAudio(text: string) {
  const client = new TextToSpeechClient();

  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: "tr-TR",
      ssmlGender: "FEMALE",
      name: "tr-TR-Wavenet-C",
    },
    audioConfig: { audioEncoding: "MP3" },
  });

  return response.audioContent;
}
