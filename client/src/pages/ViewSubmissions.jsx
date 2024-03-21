import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axiosInstance.js";
import toast from "react-hot-toast";

function ViewSubmissions() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get("/getSubmissions");
                if (res.data?.success) {
                    setData(res.data?.data);
                    toast.success(res.data?.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data.message);
            }
        })();
    }, []);

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-400">
                            <th className="px-4 py-2">sl.no</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Code Language</th>
                            <th className="px-4 py-2">Stdin</th>
                            <th className="px-4 py-2">Stdout</th>
                            <th className="px-4 py-2">Source Code</th>
                            <th className="px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr
                                className="bg-white"
                                key={item?.id}
                            >
                                <td className="border px-4 py-2">{item?.id}</td>
                                <td className="border px-4 py-2">
                                    {item?.username}
                                </td>
                                <td className="border px-4 py-2">
                                    {item?.code_language}
                                </td>
                                <td className="border px-4 py-2">
                                    {item?.stdin}
                                </td>
                                <td className="border px-4 py-2">
                                    {item?.stdout}
                                </td>
                                <td className="border px-4 py-2 min-w-[200px]">
                                    {item?.source_code}
                                </td>
                                <td className="border px-4 py-2">
                                    {item?.timestamp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewSubmissions;
