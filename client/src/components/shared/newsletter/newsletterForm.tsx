"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSubscribeMutation } from "@/store/api/strapiApi";
import Alert from "../alert";

const validationSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

interface FormValues {
  name: string;
  email: string;
}

const NewsletterForm: React.FC = () => {
  const [subscribe, { error: subscribeError, isSuccess }] =
    useSubscribeMutation();

  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState<"success" | "error">(
    "success"
  );

  const initialValues: FormValues = { name: "", email: "" };

  const onSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    subscribe(values);
    resetForm();
  };

  useEffect(() => {
    if (subscribeError) {
      setModalMessage(
        "status" in subscribeError && subscribeError.status === 400
          ? "Already subscribed"
          : "Something went wrong"
      );
      setModalStatus("error");
      setModal(true);
    } else if (isSuccess) {
      setModalMessage("Newsletter subscribed successfully");
      setModalStatus("success");
      setModal(true);
    }
  }, [subscribeError, isSuccess]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="newsletter__form">
          <div
            className={`input__wraper newsletter__input-wraper ${
              errors.name && touched.name ? "input__wraper--error" : ""
            }`}
          >
            <Field
              className="input newsletter__input-field"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage name="name" component="span" />
          </div>
          <div
            className={`input__wraper newsletter__input-wraper ${
              errors.email && touched.email ? "input__wraper--error" : ""
            }`}
          >
            <Field
              className="input newsletter__input-field"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="span" />
          </div>
          <button className="newsletter__btn btn" type="submit">
            Subscribe
          </button>
          {modal && (
            <Alert
              message={modalMessage}
              status={modalStatus}
              handleClose={() => setModal(false)}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NewsletterForm;
