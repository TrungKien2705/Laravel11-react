import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHading from "@/Components/TableHading";

function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.index"), queryParams);
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
        router.get(route("project.index"), queryParams);
    };
    const deleteProject = (id) => {
        if (!window.confirm("Are you sure you want to delete the Project?")) {
            return;
        }
        router.delete(route("project.destroy", id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Project
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-x-auto shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="w-full py-2 flex gap-2 justify-end">
                                <TextInput
                                    placeholder="Project Name"
                                    defaultValue={queryParams.name}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.taget.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                                <SelectInput
                                    className="w-[15%]"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
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
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                            >
                                                ID
                                            </TableHading>
                                            <th className="px-3 py-2 ">
                                                Image
                                            </th>
                                            <TableHading
                                                name="name"
                                                sortable
                                                sortChanged={sortChanged}
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                            >
                                                Name
                                            </TableHading>
                                            <TableHading
                                                name="status"
                                                sortable
                                                sortChanged={sortChanged}
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                            >
                                                Status
                                            </TableHading>
                                            <TableHading
                                                name="created_at"
                                                sortable
                                                sortChanged={sortChanged}
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                            >
                                                Create Date
                                            </TableHading>
                                            <TableHading
                                                name="due_date"
                                                sortable
                                                sortChanged={sortChanged}
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                            >
                                                Due Date
                                            </TableHading>
                                            <th className="px-3 py-2">
                                                Created By
                                            </th>
                                            <th className="px-3 py-2">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr
                                                key={project.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td className="px-3 py-2">
                                                    {project.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <img
                                                        src={project.image_path}
                                                        alt={project.name}
                                                        className="w-16"
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-gray-100 hover:underline">
                                                    <Link
                                                        href={route(
                                                            "project.show",
                                                            project.id
                                                        )}
                                                    >
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <span
                                                        className={`px-2 py-1 rounded text-white ${
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                project.status
                                                            ]
                                                        }`}
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Link
                                                        href={route(
                                                            "project.edit",
                                                            project.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            deleteProject(
                                                                project.id
                                                            )
                                                        }
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination link={projects?.meta?.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
