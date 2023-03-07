import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import base64 from "base64-js";

export default defineEventHandler(async (event) => {
  const { min, max } = await readBody(event);

  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  const audio = await getAudioForNumber(number);

  if (!audio) {
    return { error: true, audio: null };
  }

  const str = typeof audio === "string" ? audio : base64.fromByteArray(audio);

  return { error: false, audio: str, number };
});

async function getAudioForNumber(number: number) {
  const client = new TextToSpeechClient();

  const [response] = await client.synthesizeSpeech({
    input: { text: number.toString() },
    voice: { languageCode: "tr-TR", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  });

  return response.audioContent;
}
