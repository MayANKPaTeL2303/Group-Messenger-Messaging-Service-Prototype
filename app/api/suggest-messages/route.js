//!!!!!!!!!!!!!!    TRIED TO WRITE THE API BUT NOT ABLE TO ADD IT BECAUSE OF SOME PAYMENT WHERE NEEDED !!!!!!!!!!!
// SOME BUGS TO STILL RESOLVE!

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

//Create the OpenAi API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Set the runtime to edge for the best performance
export const runtime = "edge";

export async function POST(req) {
  try {
    const prompt =
      "Create a list of two open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      //With the openai completion.create we ge the complete response for the prompt
      model: "gpt-4-turbo-instruct",
      max_tokens: 400,
      stream: true,
      prompt,
    });

    //Convert the response to the stream
    const stream = OpenAIStream(response);

    //Response the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
}
