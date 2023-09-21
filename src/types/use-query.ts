import { type UseQueryOptions } from "@tanstack/react-query";

export type CustomizableUseQueryOptions<T> = Omit<
  UseQueryOptions<T>,
  "queryKey" | "queryFn"
>;
