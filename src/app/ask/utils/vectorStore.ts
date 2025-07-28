import { Pinecone } from "@pinecone-database/pinecone";
import crypto from "crypto";
import { PineconeStore } from "@langchain/pinecone";
import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "@langchain/core/documents";

export const loadVectorStore = async (
  embeddings: CohereEmbeddings,
  splitDocs?: Document<Record<string, any>>[]
): Promise<PineconeStore> => {
  // const vector1 = await embeddings.embedQuery(splitDocs[0].pageContent);
  // const vector2 = await embeddings.embedQuery(splitDocs[1].pageContent);

  // console.assert(vector1.length === vector2.length);
  // console.log(`Generated vectors of length ${vector1.length}\n`);
  // console.log(vector1.slice(0, 10));

  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  // list indexes
  // const indexes = await pc.listIndexes();
  // console.log(indexes)
  const pineconeIndex = pc.Index("rag-tutorial");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });
  //   await pineconeIndex.deleteAll();

  if (splitDocs) {
    const ids = splitDocs.map((doc) =>
      crypto.createHash("sha256").update(doc.pageContent).digest("hex")
    );

    await vectorStore.addDocuments(splitDocs, { ids });
  }

  return vectorStore;
};
