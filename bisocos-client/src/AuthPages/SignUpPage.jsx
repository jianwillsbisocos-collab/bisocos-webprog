import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear field error when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        contactNumber: formData.contactNumber,
        address: formData.address,
        type: 'viewer',
      });
      setSuccess(true);
      setTimeout(() => navigate("/auth/signin"), 2000);
    } catch (error) {
      setErrors({
        general:
          error?.message === "User already exists"
            ? "An account with this email already exists."
            : "Signup failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 px-8 py-14 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Account Created!</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Redirecting you to sign in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
        <div className="px-8 pt-10 pb-2">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
            <User className="h-7 w-7" />
          </div>
          <h1 className="text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Create account
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Join Sneaker &apos;s community today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {errors.general && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 animate-in fade-in slide-in-from-top-1">
              {errors.general}
            </div>
          )}

          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-zinc-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-zinc-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-11 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-zinc-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-medium">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-11 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-zinc-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-xs tracking-[0.2em]"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-50 border-t-transparent" />
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-zinc-400 uppercase tracking-wider">
                or
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
to="/auth/signin"
              className="font-semibold text-amber-900 hover:text-amber-800 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

