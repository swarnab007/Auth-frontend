import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const GoogleAuthButton = () => {
  const { googleAuth } = useAuthStore();

  const onSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential; // Updated to use `credential`
    try {
      await googleAuth(tokenId);
      toast.success("Successfully logged in with Google!");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const onError = () => {
    console.error("Google login failed.");
    toast.error("Google login failed. Please try again.");
  };

  return (
    <motion.div className="mb-6">
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </motion.div>
  );
};

export default GoogleAuthButton;
