"use client";

import { useState } from "react";
import CustomImage from "../bgImageContainer/bgImageContainer";
import Input from "../input";
import Typography from "../typography";
import { newsletterData } from "./newsletter.data";
import "@/styles/components/shared/newsletter.scss";
import Container from "../container";

function Newsletter() {
  const initData = {
    name: "",
    email: "",
  };

  const [data, setData] = useState<typeof initData>({ ...initData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    handleError(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.name || !data.email) {
      Object.keys(data).forEach((key) => {
        if (!data[key as keyof typeof initData]) {
          setError((prev) => {
            return {
              ...prev,
              [key as keyof typeof initData]:
                errorText[key as keyof typeof initData],
            };
          });
        }
      });
      return;
    }

    console.log(data);
    setData({ ...initData });
  };

  const [error, setError] = useState<typeof initData>({ ...initData });

  const errorText = {
    name: "please enter your name",
    email: "please enter your email",
  };

  const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError({
        ...error,
        [e.target.name]: errorText[e.target.name as keyof typeof errorText],
      });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  return (
    <section className="newsletter">
      <Container maxWidth="xlg">
        <div className="newsletter-container">
          <CustomImage
            className="newsletter-image"
            src={newsletterData.image.url}
            alt={newsletterData.image.alt}
            sizes={`(max-width:768px) 0vw,(max-width:1200px) 30vw,35vw`}
          />
          <div className="newsletter-wraper">
            <Typography variant="h2" className="newsletter-title">
              {newsletterData.title}
            </Typography>
            <Typography className="newsletter-description" variant="body1">
              {newsletterData.description}
            </Typography>
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
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Newsletter;
