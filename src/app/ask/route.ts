import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { CohereEmbeddings } from "@langchain/cohere";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
import { loadVectorStore } from "./utils/vectorStore";

dotenv.config({ path: "../.env" });

export async function POST(req: Request) {
  try {
    const { message: question } = await req.json();
    if (!question) {
      return NextResponse.json(
        { error: "Missing question in request body." },
        { status: 400 }
      );
    }

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      temperature: 0,
      apiKey: process.env.GEMINI_API_KEY,
    });

    const embeddings = new CohereEmbeddings({
      model: "embed-english-v3.0",
      apiKey: process.env.COHERE_API_KEY,
    });

    // Load existing vector store
    const vectorStore = await loadVectorStore(embeddings);
    const retriever = vectorStore.asRetriever();

    const relevantDocs = await retriever.invoke(question);
    const context = relevantDocs.map((doc) => doc.pageContent).join("\n");

    const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use five sentences maximum and list style if required and keep the answer as clear as possible.

{context}

Question: {question}

Helpful Answer:`;

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["user", template],
    ]);

    const prompt = await promptTemplate.invoke({ context, question });

    // stream or invoke
    const stream = await llm.stream(prompt);

    const encoder = new TextEncoder();
    const streamOutput = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(encoder.encode((chunk.content as string) ?? ""));
          }
        } catch (streamError) {
          console.error("Stream error:", streamError);
          controller.enqueue(
            encoder.encode("⚠️ An error occurred during response streaming.")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(streamOutput, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("❌ Error in /ask route:", err);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
