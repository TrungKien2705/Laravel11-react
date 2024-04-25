import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

function Edit({ auth, user }) {
    const { data, setData, post, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        _method: "PUT",
    });
    const onSubmit = (e) => {
        console;
        e.preventDefault();

        post(route("user.update", user.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit User "{user.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Edit Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-x-auto shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="user_name"
                                        value="User Name"
                                    />

                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        placeholder="User Name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="user_email"
                                        value="User Email"
                                    />

                                    <TextInput
                                        id="user_email"
                                        type="email"
                                        name="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                        placeholder="User Email"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="user_password"
                                        value="User Password"
                                    />

                                    <TextInput
                                        id="user_password"
                                        name="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="user_password_confirmation"
                                        value="Confirmation Password"
                                    />

                                    <TextInput
                                        id="user_password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex justify-end items-center gap-4">
                                    <SecondaryButton>
                                        <Link href={route("user.index")}>
                                            Cancel
                                        </Link>
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Saved
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Edit;
