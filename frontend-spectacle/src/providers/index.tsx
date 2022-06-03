import React, { ReactNode } from 'react';
import ThemeProvider from './theme';
import { Provider as ReduxProvider } from "react-redux"
import { persistor, store } from '../redux';
import { PersistGate } from 'redux-persist/integration/react';
import ApolloProvider from './apollo';

type ProvidersProps = { children: ReactNode };

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <ApolloProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </PersistGate>

            </ApolloProvider>
        </ReduxProvider>
    )
}

export default Providers;