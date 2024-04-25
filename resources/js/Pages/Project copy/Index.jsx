import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHading from "@/Components/TableHading";

function Index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
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
        router.get(route("user.index"), queryParams);
    };
    const deleteUser = (id) => {
        if (!window.confirm("Are you sure you want to delete the User?")) {
            return;
        }
        router.delete(route("user.destroy", id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        User
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow translate-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
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
                                    placeholder="User Name"
                                    defaultValue={queryParams.name}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.taget.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                                <TextInput
                                    placeholder="User Email"
                                    defaultValue={queryParams.email}
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "email",
                                            e.taget.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("email", e)}
                                />
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
                                                name="email"
                                                sortable
                                                sortChanged={sortChanged}
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                            >
                                                Email
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

                                            <th className="px-3 py-2">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td className="px-3 py-2">
                                                    {user.id}
                                                </td>
                                                <td className="px-3 py-2 text-gray-100">
                                                    {user.name}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {user.email}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {user.created_at}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            user.id
                                                        )}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            deleteUser(user.id)
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
                            <Pagination link={users?.meta?.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
