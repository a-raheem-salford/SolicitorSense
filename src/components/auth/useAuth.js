"use client";

import { useState } from "react";
import Joi from "joi";
import HTTP_REQUEST from "@/lib/axiosConfig";
import { useAuth as useAuthContext } from "@/context/AuthContext"; // ✅ import AuthContext

export function useAuth() {
  const { loginContext } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const signupSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name should be at least 3 characters",
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
  });

  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  });

  const login = async (form) => {
    const { error } = loginSchema.validate(form, { abortEarly: false });
    if (error) {
      setErrors(toErrorObject(error));
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const res = await HTTP_REQUEST.post("/api/auth/login", form);
      loginContext(res.data);
      console.log("Login Success", res.data);
    } catch (err) {
      console.log(err);
      setErrors({ server: err.response?.data?.error || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (form) => {
    const { error } = signupSchema.validate(form, { abortEarly: false });
    if (error) {
      setErrors(toErrorObject(error));
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const res = await HTTP_REQUEST.post("/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      loginContext(res.data.user);
      console.log("Signup Success", res.data);
    } catch (err) {
      console.log(err);
      setErrors({ server: err.response?.data?.error || "Signup failed" });
    } finally {
      setLoading(false);
    }
  };

  const toErrorObject = (joiError) => {
    return joiError.details.reduce((acc, cur) => {
      acc[cur.path[0]] = cur.message;
      return acc;
    }, {});
  };

  const handleReset = () => {
    setErrors({});
  };

  return { login, signup, loading, errors, handleReset };
}
