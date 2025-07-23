// app/lib/apollo/apollo-provider.tsx
"use client";

import client from "@/lib/http";
import { ApolloProvider } from "@apollo/client";


export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
