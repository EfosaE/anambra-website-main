import { ApolloError, ServerError } from "@apollo/client";

export function handleError(error: ApolloError) {
  const networkError = error.networkError as ServerError | undefined;

  if (
    networkError?.result &&
    typeof networkError.result === "object" &&
    Array.isArray((networkError.result as any).errors)
  ) {
    (networkError.result as any).errors.forEach((err: any, i: number) => {
      console.error(`GraphQL Error #${i + 1}:`, err.message);
    });
  } else {
    console.error("Apollo error:", error.message);
  }
}
