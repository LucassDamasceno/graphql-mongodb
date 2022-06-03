import React, { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderLib, createHttpLink } from "@apollo/client";
import { useSystem } from "../hooks/system";
import { store } from "../redux";
import { setContext } from '@apollo/client/link/context';


type ThemeProviderProps = { children: ReactNode };

const ApolloProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const { configService } = useSystem()

    const httpLink = createHttpLink({ uri: `${configService.backendUri}/graphql` });

    const authLink = setContext((_, { headers }) => {
        const state = store.getState();
        const token = state.auth.token;

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProviderLib client={client} >
            {children}
        </ApolloProviderLib >
    )
};

export default ApolloProvider
