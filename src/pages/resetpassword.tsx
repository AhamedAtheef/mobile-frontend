import { useState, useEffect } from "react";
import { Input } from "@/components/ui/inputs";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PulseLoader from "@/components/loading";

const ForgotPassword = () => {
    const [step, setStep] = useState<"otp" | "reset">("otp"); // step control
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // countdown for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    // ✅ Send OTP
    const sendOtp = async () => {
        if (!email) return toast.error("Enter your email");
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/getotp`, { email });
            toast.success("OTP sent! Check your email");
            setOtpSent(true);
            setResendTimer(60);
            setLoading(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
            console.log(error);
            setLoading(false);
        }
    };

    // ✅ Verify OTP
    const verifyOtp = async () => {
        if (otp.length !== 6) return toast.error("Enter 6 digit OTP");
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyotp`, { email, otp });
            toast.success("OTP verified successfully");
            setStep("reset"); // switch to reset password form
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }finally{
            setLoading(false);
        }
    };

    // ✅ Reset Password
    const handleResetPassword = async () => {
        if (!password || !confirmPassword) return toast.error("Enter all fields");
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/resetpassword`, {
                email,
                password,
            });
            toast.success("Password reset successfully. Please login.");
            navigate("/login");
            setEmail("");
            setOtp("");
            setPassword("");
            setConfirmPassword("");
            setOtpSent(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }finally{
            setLoading(false);
        }
    };
         
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            {loading ? <PulseLoader/>:
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                {step === "otp" && (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            Forgot Password
                        </h2>

                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={otpSent}
                            />

                            {!otpSent ? (
                                <Button
                                    onClick={sendOtp}
                                    className="w-full bg-black text-white hover:bg-green-600"
                                >
                                    Send OTP
                                </Button>
                            ) : (
                                <>
                                    <Input
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        maxLength={6}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Button
                                        onClick={verifyOtp}
                                        className="w-full bg-black text-white hover:bg-green-600"
                                    >
                                        Verify OTP
                                    </Button>
                                    <Button
                                        onClick={sendOtp}
                                        disabled={resendTimer > 0}
                                        className={`w-full ${resendTimer > 0
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-black text-white hover:bg-green-600"
                                            }`}
                                    >
                                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </>
                )}

                {step === "reset" && (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            Reset Password
                        </h2>

                        <div className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <Button
                                onClick={handleResetPassword}
                                className="w-full bg-black text-white hover:bg-green-600"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </>
                )}
            </div>
}
        </div>
    );
};

export default ForgotPassword;
