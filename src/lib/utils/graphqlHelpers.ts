import { ApolloError, ServerError } from "@apollo/client";

// export function logApolloError(error: ApolloError) {
//   const networkError = error.networkError as ServerError | undefined;

//   if (
//     networkError?.result &&
//     typeof networkError.result === "object" &&
//     Array.isArray((networkError.result as any).errors)
//   ) {
//     (networkError.result as any).errors.forEach((err: any, i: number) => {
//       console.error(`GraphQL Error #${i + 1}:`, err.message);
//     });
//   } else {
//     console.error("Apollo error:", error.message);
//   }
// }


export function logApolloError(error: unknown, context?: string) {
  if (!(error instanceof ApolloError)) {
    console.error(`[ApolloError] ${context ?? ""}:`, error);
    return;
  }

  if (context) {
    console.error(`[ApolloError] ${context}`);
  }

  if (error.graphQLErrors.length > 0) {
    console.groupCollapsed("GraphQL Errors:");
    error.graphQLErrors.forEach((err, i) => {
      console.error(`❌ [${i + 1}]`, err.message, err.extensions || {});
    });
    console.groupEnd();
  }

  if (error.networkError) {
    console.groupCollapsed("Network Error:");
    console.error(error.networkError);
    console.groupEnd();

    const result = (error.networkError as any)?.result;
    if (result?.errors?.length) {
      console.groupCollapsed("Network Error → GraphQL Errors:");
      result.errors.forEach((err: any, i: number) => {
        console.error(`🚫 [${i + 1}]`, err.message);
      });
      console.groupEnd();
    }
  }

  if (!error.graphQLErrors.length && !error.networkError) {
    console.error("Unknown Apollo error:", error.message);
  }
}
