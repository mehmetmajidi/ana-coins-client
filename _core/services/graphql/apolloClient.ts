import { ApolloClient, GraphQLRequest, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// HTTP link
const httpLink = new HttpLink({
     uri: `http://${process.env.LOCAL_URL}:${process.env.SERVER_API}`,
});

// WebSocket link
const wsLink = new GraphQLWsLink(
     createClient({
          url: `ws://${process.env.LOCAL_URL}:${process.env.SERVER_API}`,
     })
);

// Auth link
const authLink = setContext((request: GraphQLRequest, { headers }: { headers?: Record<string, string> }) => {
     const token = localStorage.getItem("token");
     const refreshToken = localStorage.getItem("x-refresh-token");

     return {
          headers: {
               ...headers,
               authorization: token ? `Bearer ${token}` : "",
               "x-refresh-token": refreshToken || "",
          },
     };
});

// Error link
const errorLink = onError(({ graphQLErrors }) => {
     if (graphQLErrors) {
          graphQLErrors.forEach(({ message }) => {
               if (message === "jwt expired" || message === "Refresh Token not provided" || message === "Authentication header must be provided") {
                    logout();
               }
          });
     }
});

const logout = (): void => {
     localStorage.clear();
     window.location.href = "./login";
};

// Split link
const splitLink = split(
     ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === "OperationDefinition" && definition.operation === "subscription";
     },
     wsLink,
     httpLink
);

// Apollo Client
export const client = new ApolloClient({
     link: errorLink.concat(authLink.concat(splitLink)),
     cache: new InMemoryCache({
          typePolicies: {
               Query: {
                    fields: {
                         // Custom field policies
                    },
               },
          },
     }),
});

export default client;
