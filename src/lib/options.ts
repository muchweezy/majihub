export type Option<TValue extends string | number = string> = {
    value: TValue;
    label: string;
};

export type SlugifyOptions = {
    /** Drop parenthesised text entirely: "Manual (Field Reader)" -> "manual". */
    stripParentheticals?: boolean;
    /** Treat hyphens as separators: "Bi-Monthly" -> "bi_monthly". */
    hyphensAsSeparators?: boolean;
};

/**
 * Lower-cases a human readable label and turns separators into underscores so it
 * can be used as an API/enum value.
 */
export function slugify(label: string, options: SlugifyOptions = {}): string {
    const { stripParentheticals = false, hyphensAsSeparators = false } = options;

    const withoutParentheses = stripParentheticals
        ? label.replace(/\s*\([^)]*\)/g, "")
        : label.replace(/[()]/g, "");

    const separators = hyphensAsSeparators ? /[\s/&-]+/g : /[\s/&]+/g;

    return withoutParentheses
        .toLowerCase()
        .replace(separators, "_")
        .replace(/^_+|_+$/g, "");
}

/** Builds options whose value is the label itself. */
export function toOptions<TValue extends string | number>(
    values: readonly TValue[],
): Option<TValue>[] {
    return values.map((value) => ({ value, label: String(value) }));
}

/** Builds options whose value is the slugified label. */
export function toSlugOptions(
    labels: readonly string[],
    options?: SlugifyOptions,
): Option[] {
    return labels.map((label) => ({ value: slugify(label, options), label }));
}

/** Builds options with a caller supplied value for each label. */
export function toLabeledOptions<TValue extends string | number>(
    labels: readonly string[],
    getValue: (label: string, index: number) => TValue,
): Option<TValue>[] {
    return labels.map((label, index) => ({ value: getValue(label, index), label }));
}

/** Builds options with a caller supplied label for each value. */
export function toValuedOptions<TValue extends string | number>(
    values: readonly TValue[],
    getLabel: (value: TValue, index: number) => string,
): Option<TValue>[] {
    return values.map((value, index) => ({ value, label: getLabel(value, index) }));
}
