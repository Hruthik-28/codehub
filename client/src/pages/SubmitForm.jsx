import Input from "../components/Input";
import { useForm } from "react-hook-form";
import axiosInstance from "../helpers/axiosInstance.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SubmitForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            const res = await axiosInstance.post("/submit", data);
            if (res.data?.success) {
                toast.success(res.data?.message);
                navigate("/getSubmissions");
            }
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };
    return (
        <>
            <section className="w-full">
                <form
                    onSubmit={handleSubmit(submit)}
                    className="wrapper w-full mx-auto mt-5 max-w-md shadow-lg border-slate-600 border p-8 rounded-3xl shadow-black text-white"
                >
                    <h1 className="font-bold font-mono text-xl text-center underline text-white">
                        SUBMIT YOUR CODE SNIPPET
                    </h1>

                    <div className="space-y-4 mt-5">
                        <Input
                            label="username"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "username is required",
                            })}
                        />
                        {errors.username && (
                            <span className="text-sm font-medium text-red-500">
                                {errors.username.message}
                            </span>
                        )}

                        <div>
                            <label className="mt-2">code language</label>

                            <select
                                name="Code language"
                                className="w-full p-2 rounded-lg bg-transparent bg-gray-600 mt-1 cursor-pointer"
                                {...register("code_language", {
                                    required:
                                        "Please select your code language",
                                })}
                            >
                                <option
                                    value="c++"
                                    className="bg-black p-4"
                                >
                                    C++
                                </option>
                                <option
                                    value="javascript"
                                    className="bg-black"
                                >
                                    Javascript
                                </option>
                                <option
                                    value="python"
                                    className="bg-black"
                                >
                                    Python
                                </option>
                                <option
                                    value="java"
                                    className="bg-black"
                                >
                                    Java
                                </option>
                            </select>
                            {errors.code_language && (
                                <span className="text-sm font-medium text-red-500">
                                    {errors.code_language.message}
                                </span>
                            )}
                        </div>

                        <Input
                            label="stdin"
                            placeholder="Enter your stdin"
                            {...register("stdin", {
                                required: "Please enter your input",
                            })}
                        />
                        {errors.stdin && (
                            <span className="text-sm font-medium text-red-500">
                                {errors.stdin.message}
                            </span>
                        )}
                        <div>
                            <label htmlFor="">source code</label>
                            <textarea
                                name="source code"
                                className="w-full bg-gray-600 rounded-lg min-h-20 mt-2 p-2 h-28"
                                {...register("source_code", {
                                    required: "Please enter your source code",
                                })}
                            ></textarea>
                            {errors.source_code && (
                                <span className="text-sm font-medium text-red-500">
                                    {errors.source_code.message}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black py-2 rounded-lg hover:bg-opacity-60"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default SubmitForm;
