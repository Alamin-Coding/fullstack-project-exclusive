import { useState } from "react";
import { Link } from "react-router";
import Input from "../components/Input";
import Button from "../components/ButtonTag";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const forgoPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/forgot-password`,
        {
          email: email,
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Replace with your real API call, e.g.:
      forgoPassword();
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        {!sent ? (
          <>
            <h1 className="text-xl font-semibold text-slate-900">
              Forgot your password?
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter the email linked to your account and we'll send you a reset
              link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />

              <Button type="submit" loading={loading}>
                {loading ? "Sending link..." : "Send reset link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              Check your inbox
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              We sent a reset link to{" "}
              <span className="font-medium text-slate-700">{email}</span>.
            </p>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-500">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
