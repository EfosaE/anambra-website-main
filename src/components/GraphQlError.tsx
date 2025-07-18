// import { ApolloError } from "@apollo/client";

// export function GraphQLError({ error }: { error: ApolloError }) {
//   if (!error?.networkError?.result?.errors) return null;

//   return (
//     <div style={{ padding: '20px', background: '#ffe6e6', color: '#d00' }}>
//       <h3>Server Errors:</h3>
//       {error.networkError.result.errors.map((err, i) => (
//         <div key={i}>{err.message}</div>
//       ))}
//     </div>
//   );
// }
