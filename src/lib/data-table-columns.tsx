import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

type ColumnOptions<TData> = Omit<
    ColumnDef<TData>,
    "id" | "accessorKey" | "header"
> & {
    id: string;
    header: string;
    /** Extra classes for the rendered cell content. */
    className?: string;
};

/** Renders the shared table header markup. */
export function columnHeader(title: string, className?: string) {
    return () => <p className={cn("column-title", className)}>{title}</p>;
}

/**
 * Base column: shared header rendering plus the id/accessorKey pairing every
 * column in the app repeats.
 */
export function column<TData>({
    id,
    header,
    className,
    ...rest
}: ColumnOptions<TData>): ColumnDef<TData> {
    return {
        id,
        accessorKey: id,
        header: columnHeader(header, className),
        ...rest,
    };
}

/** Plain text cell. */
export function textColumn<TData>({
    className,
    ...options
}: ColumnOptions<TData> & { className?: string }): ColumnDef<TData> {
    return column<TData>({
        ...options,
        cell: ({ getValue }) => (
            <span className={cn("text-sm", className)}>{getValue<string>()}</span>
        ),
    });
}

/** Single badge cell. */
export function badgeColumn<TData>({
    variant = "default",
    className,
    format,
    ...options
}: ColumnOptions<TData> & {
    variant?: BadgeVariant;
    format?: (value: string) => string;
}): ColumnDef<TData> {
    return column<TData>({
        ...options,
        cell: ({ getValue }) => {
            const value = getValue<string>();
            return (
                <Badge variant={variant} className={className}>
                    {format ? format(value) : value}
                </Badge>
            );
        },
    });
}

/** Yes/no badge cell for boolean fields. */
export function booleanBadgeColumn<TData>({
    trueVariant = "default",
    falseVariant = "outline",
    ...options
}: ColumnOptions<TData> & {
    trueVariant?: BadgeVariant;
    falseVariant?: BadgeVariant;
}): ColumnDef<TData> {
    return column<TData>({
        ...options,
        cell: ({ getValue }) => {
            const enabled = getValue<boolean>();
            return (
                <Badge
                    variant={enabled ? trueVariant : falseVariant}
                    className="text-xs"
                >
                    {enabled ? "✓ Yes" : "✗ No"}
                </Badge>
            );
        },
    });
}

/** Badge list cell that collapses the overflow into a "+n" counter. */
export function badgeListColumn<TData>({
    visibleCount = 2,
    ...options
}: ColumnOptions<TData> & { visibleCount?: number }): ColumnDef<TData> {
    return column<TData>({
        ...options,
        cell: ({ getValue }) => {
            const values = getValue<string[]>() ?? [];
            const hiddenCount = values.length - visibleCount;
            return (
                <div className="flex gap-1 flex-wrap">
                    {values.slice(0, visibleCount).map((value) => (
                        <Badge key={value} variant="outline" className="text-[10px]">
                            {value}
                        </Badge>
                    ))}
                    {hiddenCount > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                            +{hiddenCount}
                        </span>
                    )}
                </div>
            );
        },
    });
}
