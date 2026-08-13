import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {Search} from "lucide-react";
import {useMemo, useState} from "react";
import {Input} from "@/components/ui/input.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DEPARTMENT_OPTIONS, NCWSC_DIVISION_OPTIONS} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import { useTable } from "@refinedev/react-table";
import {Service} from "@/types";
import {Badge} from "@/components/ui/badge.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";

const ServicesList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedDivision, setSelectedDivision] = useState('all');

    const departmentFilters = selectedDepartment === 'all'
        ? []
        : [{
            field: 'department',
            operator: 'eq' as const,
            value: selectedDepartment,
        }];
    const divisionFilters = selectedDivision === 'all' ? [] : [{
        field: 'department',
        operator: 'eq' as const,
        value: selectedDivision
    }];
    const searchFilters = searchQuery ? [{
        field: 'name',
        operator: 'contains' as const,
        value: searchQuery
    }] : [];
    const servicesTable = useTable<Service>({
        columns : useMemo<ColumnDef<Service>[]>(() => [
            {
                id: 'serviceCode',
                accessorKey: 'serviceCode',
                header: () => <p className="column-title ml-2">Service Code</p>,
                size: 120,
                cell: ({ getValue }) => <Badge className="font-mono text-xs">{getValue<string>()}</Badge>
            },
            {
                id: 'name',
                accessorKey: 'name',
                header: () => <p className="column-title">Name</p>,
                size: 200,
                cell: ({ getValue }) => <span className="text-foreground font-medium">{getValue<string>()}</span>,
                filterFn: 'includesString'
            },
            {
                id: 'department',
                accessorKey: 'department',
                header: () => <p className="column-title">Department</p>,
                size: 250,
                cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
            },
            {
                id: 'module',
                accessorKey: 'module',
                header: () => <p className="column-title">Module</p>,
                size: 140,
                cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getValue<string>()}</span>,
            },
            {
                id: 'description',
                accessorKey: 'description',
                header: () => <p className="column-title">Description</p>,
                size: 300,
                cell: ({ getValue }) => <span className="truncate line-clamp-2 text-sm">{getValue<string>()}</span>,
            },
            {
                id: 'status',
                accessorKey: 'status',
                header: () => <p className="column-title">Status</p>,
                size: 110,
                cell: ({ getValue }) => {
                    const status = getValue<string>();
                    const statusMap: Record<string, string> = {
                        active: 'active',
                        inactive: 'offline',
                        beta: 'processing',
                        deprecated: 'rejected'
                    };
                    return <Badge variant="outline" className="text-xs">{status?.toUpperCase()}</Badge>;
                }
            },
            {
                id: 'sla',
                accessorKey: 'sla',
                header: () => <p className="column-title">SLA</p>,
                size: 150,
                cell: ({ getValue }) => {
                    const sla = getValue<any>();
                    return (
                        <span className="text-xs text-muted-foreground">
                            {sla?.resolutionHours ? `${sla.resolutionHours}h` : 'N/A'}
                        </span>
                    );
                }
            },
            {
                id: 'tags',
                accessorKey: 'tags',
                header: () => <p className="column-title">Tags</p>,
                size: 180,
                cell: ({ getValue }) => {
                    const tags = getValue<string[]>() || [];
                    return (
                        <div className="flex gap-1 flex-wrap">
                            {tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-[10px]">{tag}</Badge>
                            ))}
                            {tags.length > 2 && <span className="text-[10px] text-muted-foreground">+{tags.length - 2}</span>}
                        </div>
                    );
                }
            },
            {
                id: 'applicationFeeKES',
                accessorKey: 'applicationFeeKES',
                header: () => <p className="column-title">App Fee</p>,
                size: 100,
                cell: ({ getValue }) => <span className="font-mono text-sm">KES {getValue<number>()?.toFixed(2) || '0.00'}</span>,
            },
            {
                id: 'selfServiceEligible',
                accessorKey: 'selfServiceEligible',
                header: () => <p className="column-title">Self Service</p>,
                size: 100,
                cell: ({ getValue }) => {
                    const eligible = getValue<boolean>();
                    return (
                        <Badge variant={eligible ? 'default' : 'outline'} className="text-xs">
                            {eligible ? '✓ Yes' : '✗ No'}
                        </Badge>
                    );
                }
            },
            {
                id: 'requiresFieldVisit',
                accessorKey: 'requiresFieldVisit',
                header: () => <p className="column-title">Field Visit</p>,
                size: 100,
                cell: ({ getValue }) => {
                    const required = getValue<boolean>();
                    return (
                        <Badge variant={required ? 'secondary' : 'outline'} className="text-xs">
                            {required ? '✓ Yes' : '✗ No'}
                        </Badge>
                    );
                }
            },
            {
                id: 'documentsRequired',
                accessorKey: 'documentsRequired',
                header: () => <p className="column-title">Documents</p>,
                size: 120,
                cell: ({ getValue }) => {
                    const docs = getValue<string[]>() || [];
                    return (
                        <span className="text-xs text-muted-foreground cursor-help" title={docs.join(', ')}>
                            {docs.length > 0 ? `${docs.length} required` : 'None'}
                        </span>
                    );
                }
            }
        ], []),
        refineCoreProps : {
            resource: 'service',
            pagination: {
                pageSize: 10,
                mode: 'server'
            },
            filters: {
                permanent: [...departmentFilters, ...searchFilters, ...divisionFilters]
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
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by department"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Departments
                                </SelectItem>
                                {DEPARTMENT_OPTIONS.map(department =>(
                                    <SelectItem key={department.value}
                                        value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedDivision}
                            onValueChange={setSelectedDivision}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by division"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Divisions
                                </SelectItem>
                                {NCWSC_DIVISION_OPTIONS.map(department =>(
                                    <SelectItem key={department.value}
                                                value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton />
                    </div>
                </div>
            </div>
            <DataTable table={servicesTable} />
        </ListView>
    )
}
export default ServicesList
