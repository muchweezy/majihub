import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {useMemo, useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import {FilterSelect} from "@/components/filter-select.tsx";
import {DEPARTMENT_OPTIONS, NCWSC_DIVISION_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import { useTable } from "@refinedev/react-table";
import {Service} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {ALL_FILTER_VALUE, combineFilters, optionalFilter} from "@/lib/filters";
import {
    badgeColumn,
    badgeListColumn,
    booleanBadgeColumn,
    column,
    textColumn,
} from "@/lib/data-table-columns.tsx";

const ServicesList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(ALL_FILTER_VALUE);
    const [selectedDivision, setSelectedDivision] = useState(ALL_FILTER_VALUE);

    const servicesTable = useTable<Service>({
        columns : useMemo<ColumnDef<Service>[]>(() => [
            badgeColumn<Service>({
                id: 'serviceCode',
                header: 'Service Code',
                className: 'font-mono text-xs',
                size: 120,
            }),
            column<Service>({
                id: 'name',
                header: 'Name',
                size: 200,
                cell: ({ getValue }) => <span className="text-foreground font-medium">{getValue<string>()}</span>,
                filterFn: 'includesString'
            }),
            badgeColumn<Service>({
                id: 'department',
                header: 'Department',
                variant: 'secondary',
                size: 250,
            }),
            textColumn<Service>({
                id: 'module',
                header: 'Module',
                className: 'text-muted-foreground',
                size: 140,
            }),
            textColumn<Service>({
                id: 'description',
                header: 'Description',
                className: 'truncate line-clamp-2',
                size: 300,
            }),
            badgeColumn<Service>({
                id: 'status',
                header: 'Status',
                variant: 'outline',
                className: 'text-xs',
                format: (status) => status?.toUpperCase(),
                size: 110,
            }),
            column<Service>({
                id: 'sla',
                header: 'SLA',
                size: 150,
                cell: ({ row }) => {
                    const sla = row.original.sla;
                    return (
                        <span className="text-xs text-muted-foreground">
                            {sla?.resolutionHours ? `${sla.resolutionHours}h` : 'N/A'}
                        </span>
                    );
                }
            }),
            badgeListColumn<Service>({
                id: 'tags',
                header: 'Tags',
                size: 180,
            }),
            column<Service>({
                id: 'applicationFeeKES',
                header: 'App Fee',
                size: 100,
                cell: ({ getValue }) => <span className="font-mono text-sm">KES {getValue<number>()?.toFixed(2) || '0.00'}</span>,
            }),
            booleanBadgeColumn<Service>({
                id: 'selfServiceEligible',
                header: 'Self Service',
                size: 100,
            }),
            booleanBadgeColumn<Service>({
                id: 'requiresFieldVisit',
                header: 'Field Visit',
                trueVariant: 'secondary',
                size: 100,
            }),
            column<Service>({
                id: 'documentsRequired',
                header: 'Documents',
                size: 120,
                cell: ({ getValue }) => {
                    const docs = getValue<string[]>() || [];
                    return (
                        <span className="text-xs text-muted-foreground cursor-help" title={docs.join(', ')}>
                            {docs.length > 0 ? `${docs.length} required` : 'None'}
                        </span>
                    );
                }
            })
        ], []),
        refineCoreProps : {
            resource: 'service',
            pagination: {
                pageSize: 10,
                mode: 'server'
            },
            filters: {
                permanent: combineFilters(
                    optionalFilter('department', selectedDepartment),
                    optionalFilter('name', searchQuery, 'contains'),
                    optionalFilter('department', selectedDivision),
                )
            },
            sorters: {
                initial: [
                    {
                        field: 'code',
                        order: 'desc'
                    }
                ]
            },
        }
    });
    return (
        <ListView>
            <Breadcrumb />
            <h1 className="page-title">Services</h1>
            <div className="intro-row">
                <p>Quick access to essential services and management tools.</p>
                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />

                        <Input
                            type="text"
                            placeholder="Search by name..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <FilterSelect
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                            options={DEPARTMENT_OPTIONS}
                            placeholder="Filter by department"
                            allLabel="All Departments"
                        />
                        <FilterSelect
                            value={selectedDivision}
                            onValueChange={setSelectedDivision}
                            options={NCWSC_DIVISION_OPTIONS}
                            placeholder="Filter by division"
                            allLabel="All Divisions"
                        />

                        <CreateButton />
                    </div>
                </div>
            </div>
            <DataTable table={servicesTable} />
        </ListView>
    )
}
export default ServicesList
