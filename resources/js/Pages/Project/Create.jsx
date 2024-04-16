import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        image: "",
        status: "",
        description: "",
        due_date: "",
    });
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("project.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create Project
                    </h2>
                </div>
            }
        >
            <Head title="Create Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-x-auto shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="project_image_path"
                                        value="Project Image"
                                    />

                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.image}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="project_name"
                                        value="Project Name"
                                    />

                                    <TextInput
                                        id="project_name"
                                        type="text"
                                        name="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        placeholder="Project Name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="project_status"
                                        value="Project Status"
                                    />

                                    <SelectInput
                                        id="project_status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>

                                    <InputError
                                        className="mt-2"
                                        message={errors.status}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="project_due_date"
                                        value="Project Deadline"
                                    />

                                    <TextInput
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.due_date}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="project_description"
                                        value="Project Description"
                                    />

                                    <TextAreaInput
                                        id="project_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex justify-end items-center gap-4">
                                    <SecondaryButton>
                                        <Link href={route("project.index")}>
                                            Cancel
                                        </Link>
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Submit
                                    </PrimaryButton>

                                    {/* <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Saved.
                                        </p>
                                    </Transition> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
