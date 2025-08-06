"use client";

import React from "react";
import { ApolloError } from "@apollo/client";

type ErrorWithRetryProps = {
  error: ApolloError;
  onRetry: () => void;
  message?: string;
};

export default function ErrorWithRetry({
  error,
  onRetry,
  message = "Failed to load data.",
}: ErrorWithRetryProps) {
  // Check if there are GraphQL errors.
  const hasGraphQLErrors = error.graphQLErrors && error.graphQLErrors.length > 0;
  // Check specifically for network errors that are not 400 Bad Request.
  const isNetworkOnlyError =
    error.networkError &&
    "statusCode" in error.networkError &&
    (error.networkError as any).statusCode !== 400;

  return (
    <div className="text-center text-red-500 py-10">
      {hasGraphQLErrors ? (
        <>
          {/* Display a specific message for GraphQL errors. */}
          GraphQL error. The request was malformed or failed on the server.
          <button
            onClick={onRetry}
            className="underline text-blue-600 hover:text-blue-800 ml-3"
          >
            Retry
          </button>
        </>
      ) : isNetworkOnlyError ? (
        <>
          {/* Display a specific message for pure network errors. */}
          Network error. Please check your internet connection.{" "}
          <button
            onClick={onRetry}
            className="underline text-blue-600 hover:text-blue-800 ml-3"
          >
            Retry
          </button>
        </>
      ) : (
        <>
          {/* Fallback for other errors. */}
          {message}{" "}
          <button
            onClick={onRetry}
            className="underline text-blue-600 hover:text-blue-800 ml-3"
          >
            Retry
          </button>
        </>
      )}
    </div>
  );
}