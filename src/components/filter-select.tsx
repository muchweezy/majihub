import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { ALL_FILTER_VALUE } from "@/lib/filters";
import type { Option } from "@/lib/options";

type FilterSelectProps = {
    value: string;
    onValueChange: (value: string) => void;
    options: readonly Option[];
    placeholder: string;
    /** Label of the "no filter" entry, e.g. "All Departments". */
    allLabel: string;
    className?: string;
};

/** Select that filters a list, with a leading "all" entry. */
export function FilterSelect({
    value,
    onValueChange,
    options,
    placeholder,
    allLabel,
    className,
}: FilterSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={ALL_FILTER_VALUE}>{allLabel}</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
