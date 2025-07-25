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
  const isNetworkError = Boolean(error?.networkError);

  return (
    <div className="text-center text-red-500 py-10">
      {isNetworkError ? (
        <>
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
