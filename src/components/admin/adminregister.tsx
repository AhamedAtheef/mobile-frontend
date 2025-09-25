import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface AdminForm {
    name: string;
    email: string;
    password: string;
}

interface AdminRegisterProps {
    onClose: () => void;
    fetchusers: () => void;
}

export default function AdminRegister({ onClose, fetchusers }: AdminRegisterProps) {
    const [form, setForm] = useState<AdminForm>({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
                {
                    ...form,
                    role: "admin",
                }
            );

            toast.success("Admin registered successfully");
            console.log(res.data);
            setForm({ name: "", email: "", password: "" });
            fetchusers();
            onClose(); // close modal after success
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="fixed inset-0 pl-[10%] flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-center text-black">
                        Register Admin
                    </h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 text-black border rounded-lg focus:ring focus:outline-none focus:border-none"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 text-black border rounded-lg focus:ring focus:outline-none focus:border-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 text-black border rounded-lg focus:ring focus:outline-none focus:border-none"
                    />

                    <div className="space-y-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Register Admin
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
