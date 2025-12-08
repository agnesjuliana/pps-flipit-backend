import fs from 'node:fs';

import axios, { type AxiosResponse } from 'axios';
import FormData from 'form-data';

export async function requestUploadChatPdf(file: Express.Multer.File) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(file.path));

  const options = {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'x-api-key': 'sec_gpFXYJTCJI7k5aiVrQexlH36d3SOACTc',
      ...formData.getHeaders(),
    },
  };

  try {
    const response: AxiosResponse<{ sourceId: string }> = await axios.post(
      'https://api.chatpdf.com/v1/sources/add-file',
      formData,
      options,
    );
    return response.data.sourceId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error:', error.message);
      console.error('Response:', error.response.data);
    } else {
      console.error('Error:', error);
    }
    return null;
  }
}

export async function requestQuestionChatPdf(sourceId: string) {
  const options = {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'x-api-key': 'sec_gpFXYJTCJI7k5aiVrQexlH36d3SOACTc',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const prompt =
    "Buat 5 pertanyaan dari dokumen tersebut beserta dengan jawabannya. Tulis dalam bentuk JSON dalam array object bernama 'data' dan properti object 'question' dan 'answer'.";
  const payload = {
    sourceId: sourceId,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  };

  try {
    const response: AxiosResponse<{ content: string }> = await axios.post(
      'https://api.chatpdf.com/v1/chats/message',
      payload,
      options,
    );
    return response.data.content;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error:', error.message);
      console.error('Response:', error.response.data);
    } else {
      console.error('Error:', error);
    }
    return null;
  }
}
