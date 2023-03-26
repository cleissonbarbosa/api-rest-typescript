import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { CreateImageRequestSizeEnum } from "openai/dist/api";
import ApiError from "../exceptions/ApiError";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function createImage (prompt: string, size: CreateImageRequestSizeEnum | null = null): Promise<string> {
  if (!configuration.apiKey) {
    throw new ApiError( "OpenAI API key not configured, please follow instructions in README.md", 500);
  }

  if (prompt.trim().length === 0) {
    throw new ApiError( "Please enter a valid prompt", 400 );
  }

  try {
    const result = await openai.createImage({
        prompt: generatePrompt(prompt),
        n: 1,
        size: size ?? "1024x1024",
    });
    return new Promise((resolve) => resolve( result.data.data[0].url as string ) );
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
        console.error(error.response.status, error.response.data);
        throw new ApiError( error.response.data, error.response.status );
    } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        throw new ApiError( 'An error occurred during your request.', error.response.status );
    }
  }
}

function generatePrompt(input) {
  const capitalizedPrompt =
  input[0].toUpperCase() + input.slice(1).toLowerCase();
  return `${capitalizedPrompt}`;
}