import type { CrudFilter, LogicalFilter } from "@refinedev/core";

/** Sentinel value used by select filters that mean "do not filter". */
export const ALL_FILTER_VALUE = "all";

/**
 * Builds a single filter, or nothing when the value is empty or the
 * "all" sentinel. Spread the result into a filters array.
 */
export function optionalFilter(
    field: string,
    value: string | undefined,
    operator: LogicalFilter["operator"] = "eq",
): CrudFilter[] {
    if (!value || value === ALL_FILTER_VALUE) {
        return [];
    }

    return [{ field, operator, value }];
}

/** Combines several optional filters, dropping the empty ones. */
export function combineFilters(...filters: CrudFilter[][]): CrudFilter[] {
    return filters.flat();
}
