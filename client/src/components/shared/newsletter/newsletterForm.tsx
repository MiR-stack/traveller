"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Input from "../input";
import { newsletterData } from "./newsletter.data";

interface FormData {
  name: string;
  email: string;
}

interface ErrorData {
  name: string;
  email: string;
}

const NewsletterForm: React.FC = () => {
  const initData: FormData = {
    name: "",
    email: "",
  };

  const [data, setData] = useState<FormData>(initData);
  const [error, setError] = useState<ErrorData>(initData);

  const errorText = {
    name: "Please enter your name",
    email: "Please enter your email",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    handleError(name, value);
  };

  const handleError = (name: string, value: string) => {
    setError((prev) => ({
      ...prev,
      [name]: value ? "" : errorText[name as keyof typeof errorText],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!data.name || !data.email) {
      Object.keys(data).forEach((key) => {
        if (!data[key as keyof FormData]) {
          handleError(key, "");
        }
      });
      return;
    }

    console.log(data);
    setData(initData);
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <Input
        className="newsletter-input"
        placeholder="Name"
        name="name"
        value={data.name}
        error={error.name}
        onChange={handleChange}
      />
      <Input
        className="newsletter-input"
        placeholder="Email"
        type="email"
        name="email"
        value={data.email}
        error={error.email}
        onChange={handleChange}
      />
      <button className="newsletter-btn btn" type="submit">
        {newsletterData.btn}
      </button>
    </form>
  );
};

export default NewsletterForm;
