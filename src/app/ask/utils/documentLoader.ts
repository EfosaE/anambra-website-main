import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";

export async function loadDocument() {
  const loader = new PDFLoader("./data/docker_notes.pdf", {
    splitPages: false,
  });

  const docs = await loader.load();
  console.log(docs.length);
  return docs;
}

await loadDocument().catch((error) => {
  console.error("Error loading document:", error);
});

export async function loadJSONDocument() {
  const loader = new JSONLoader("./data/anambra_content.json", [
    "/title",
    "/content",
    "/description",
  ]);

  const docs = await loader.load();

  console.log(`Loaded ${docs.length} docs from JSON.`);
  return docs;
}
