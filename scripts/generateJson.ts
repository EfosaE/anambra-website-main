import { GraphQLClient, gql } from "graphql-request";
import dotenv from "dotenv";
import { FAQ } from "@/types/graphql/faq";
import { Service } from "@/types/graphql/service";
import fs from "fs/promises";
import path from "path";

// scripts/test-env.ts
// import dotenv from "dotenv";
const res = dotenv.config({ path: "../.env" });
console.log("Loaded:", res);
console.log("Endpoint:", process.env.STRAPI_GRAPHQL_ENDPOINT);

interface GraphQLResponse {
  services: Service[];
  faqs: FAQ[];
}

// console.log(process.env.STRAPI_GRAPHQL_ENDPOINT)

const client = new GraphQLClient(process.env.STRAPI_GRAPHQL_ENDPOINT!, {
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`, // if needed
  },
});

const query = gql`
  {
    services {
      Name
      Description
      ServicesDetails
      WebsiteLink
      email
      phone
      publishedAt
    }
    faqs {
      question
      faqAnswer
      action {
        name
        url
      }
    }
  }
`;

async function generateJSON() {
  try {
    const data: GraphQLResponse = await client.request<GraphQLResponse>(query);

    const combined = [
      ...data.services.map((s) => ({
        title: s.Name,
        description: s.Description,
        content: s.ServicesDetails,
        source: `Service: ${s.Name}`,
      })),
      ...data.faqs.map((f) => ({
        title: f.question,
        content: f.faqAnswer,
        source: "FAQ",
      })),
    ];
    console.log(combined);
    // Ensure the folder exists
    const outputFolder = path.join(__dirname, "../data");
    await fs.mkdir(outputFolder, { recursive: true });

    // Write to JSON file
    const outputPath = path.join(outputFolder, "anambra_content.json");
    await fs.writeFile(outputPath, JSON.stringify(combined, null, 2), "utf8");

    console.log(`✅ JSON saved to ${outputPath}`);
    // return combined;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

generateJSON();

//  const faqs = data.faqs?.data.map((f) => ({
//       title: f.attributes.question,
//       content: f.attributes.faqAnswer,
//       source: "FAQ",
//     })) || [];
