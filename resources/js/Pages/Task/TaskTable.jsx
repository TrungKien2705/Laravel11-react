import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHading from "@/Components/TableHading";
import { Link, router } from "@inertiajs/react";

function TaskTable({ tasks, queryParams = null, hideProjectColum = false }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams);

        // router.get(route("project.show", ), queryParams);
    };
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("task.index"), queryParams);
    };
    return (
        <>
            <div className="w-full py-2 flex gap-2 justify-end">
                <TextInput
                    placeholder="Task Name"
                    defaultValue={queryParams.name}
                    onBlur={(e) => searchFieldChanged("name", e.taget.value)}
                    onKeyPress={(e) => onKeyPress("name", e)}
                />
                <SelectInput
                    className="w-[15%]"
                    defaultValue={queryParams.status}
                    onChange={(e) =>
                        searchFieldChanged("status", e.target.value)
                    }
                >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </SelectInput>
            </div>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHading
                                name="id"
                                sortable
                                sortChanged={sortChanged}
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                            >
                                ID
                            </TableHading>
                            <th className="px-3 py-2 ">Image</th>
                            {hideProjectColum && (
                                <th className="px-3 py-2 ">Project Name</th>
                            )}
                            <TableHading
                                name="name"
                                sortable
                                sortChanged={sortChanged}
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                            >
                                Name
                            </TableHading>
                            <TableHading
                                name="status"
                                sortable
                                sortChanged={sortChanged}
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                            >
                                Status
                            </TableHading>
                            <TableHading
                                name="created_at"
                                sortable
                                sortChanged={sortChanged}
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                            >
                                Create Date
                            </TableHading>
                            <TableHading
                                name="due_date"
                                sortable
                                sortChanged={sortChanged}
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                            >
                                Due Date
                            </TableHading>
                            <th className="px-3 py-2">Created By</th>
                            <th className="px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((task) => (
                            <tr
                                key={task.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                    <img
                                        src={task.image_path}
                                        alt={task.name}
                                        className="w-16"
                                    />
                                </td>
                                {hideProjectColum && (
                                    <td className="px-3 py-2">
                                        {task.project.name}
                                    </td>
                                )}
                                <td className="px-3 py-2">{task.name}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }`}
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    {task.created_at}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    {task.due_date}
                                </td>
                                <td className="px-3 py-2">
                                    {task.createdBy.name}
                                </td>
                                <td className="px-3 py-2">
                                    <Link
                                        href={route("task.edit", task.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route("task.destroy", task.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination link={tasks?.meta?.links} />
        </>
    );
}

export default TaskTable;
