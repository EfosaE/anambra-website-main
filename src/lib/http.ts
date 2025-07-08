// lib/http.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'


const httpLink = new HttpLink({
  uri: "https://cms.anambrastate.gov.ng/headless/graphql",
  headers: {
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
    Authorization: `Bearer ${"8584f84e10812e6822262e323eb83d863001d8a6bf8523472b28d92067e01148e007c2590e4619fa7bbd42417ca2e5316265bb58fa7788a610145751b4707e9572741b9acf9c9415ad97b5b11b6792d54eb8e07809125cb2536e09e83cde42c6aabf5bc65c893ff1ac9a0fc46b6657dc1f03f822a68c5c2de8026ac35c4fb9a9"}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
