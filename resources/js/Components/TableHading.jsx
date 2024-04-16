import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

function TableHading({
    sort_field,
    sort_direction,
    name,
    sortChanged,
    sortable = true,
    children,
}) {
    return (
        <th onClick={(e) => sortChanged(name)} className="px-3 py-2">
            <div className="cursor-pointer flex items-center justify-between gap-1">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={`w-4 ${
                                sort_field === name &&
                                sort_direction === "asc" &&
                                "text-white"
                            }`}
                        />
                        <ChevronDownIcon
                            className={`w-4 -mt-2 ${
                                sort_field === name &&
                                sort_direction === "desc" &&
                                "text-white"
                            }`}
                        />
                    </div>
                )}
            </div>
        </th>
    );
}

export default TableHading;
