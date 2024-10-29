"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { sendMail } from "@/lib/send-mail";
import React, { useState } from "react";

const Signup = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    // sendMail();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    console.log(e.target.name);
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 m-8 border rounded-lg">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full mt-2"
              value={creds.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password" className="">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full mt-2"
              value={creds.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
