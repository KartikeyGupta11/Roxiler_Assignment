import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/otp/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if(!res.ok){
                toast.error(data.message || "Failed to send OTP");
                return;
            }

            toast.success("OTP sent successfully");
            localStorage.setItem("resetEmail", email);
            navigate("/verify-otp");
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while sending OTP");
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Passowrd</h2>

                <form onSubmit={handleSendOTP} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Send OTP
                    </button>
                </form>
            </div>
        </div>
    )
}