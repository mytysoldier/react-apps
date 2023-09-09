"use client";

import gqlClient from "@/lib/gql_client";
import { ApolloProvider } from "@apollo/client";

export function GqlProvider(props: { children: React.ReactNode }) {
  return <ApolloProvider client={gqlClient}>{props.children}</ApolloProvider>;
}
