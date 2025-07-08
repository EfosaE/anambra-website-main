// import { GraphQLClient, gql } from 'graphql-request'
// import dotenv from 'dotenv'

// dotenv.config()

// const client = new GraphQLClient(process.env.STRAPI_GRAPHQL_ENDPOINT!)

// const query = gql`
//   {
//     pages {
//       title
//       slug
//       body
//     }
//     faqs {
//       question
//       answer
//     }
//   }
// `

// async function fetchData() {
//   try {
//     const data = await client.request(query)

//     const combined = [
//       ...data.pages.map((p: any) => ({
//         title: p.title,
//         slug: p.slug,
//         content: p.body,
//         source: `Page: ${p.slug}`,
//       })),
//       ...data.faqs.map((f: any) => ({
//         title: f.question,
//         content: f.answer,
//         source: "FAQ",
//       })),
//     ]

//     console.log("Fetched content count:", combined.length)
//     return combined
//   } catch (err) {
//     console.error("Error fetching data:", err)
//   }
// }

// fetchData()
