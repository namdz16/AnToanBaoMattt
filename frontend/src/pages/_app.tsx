import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import '../../styles/globals.css';  

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-white text-gray-800">
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;