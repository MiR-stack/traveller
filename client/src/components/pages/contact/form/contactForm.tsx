"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Typography from "@/components/shared/typography";
import { useContactMutation } from "@/store/api/strapiApi";
import Alert from "@/components/shared/alert";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  message: Yup.string().required("Please enter your message"),
});

function ContactForm() {
  const [contact, { error, isSuccess }] = useContactMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await contact(values);
      resetForm();
      setAlertMessage("Message sent successfully!");
      setAlertStatus("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Failed to send message:", error);
      setAlertMessage("Failed to send message. Please try again.");
      setAlertStatus("error");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (error) {
      setAlertMessage("An error occurred. Please try again.");
      setAlertStatus("error");
      setShowAlert(true);
    }
  }, [error]);

  return (
    <div className="contactForm">
      <Typography className="contactForm__title" variant="h2">
        Contact Us
      </Typography>
      <Typography className="contactForm__subTitle" variant="body1">
        Your satisfaction is our top priority. Contact us for personalized
        travel support.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="contactForm__form">
            <div className="contactForm__input--wrapper">
              <Field
                className={`contactForm__input input ${
                  errors.name && touched.name ? "input--error" : ""
                }`}
                name="name"
                placeholder="Name"
              />
              <ErrorMessage className="text--error" name="name" component="p" />
            </div>
            <div className="contactForm__input--wrapper">
              <Field
                className={`contactForm__input input ${
                  errors.email && touched.email ? "input--error" : ""
                }`}
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                className="text--error"
                name="email"
                component="p"
              />
            </div>
            <div className="contactForm__textarea--wrapper">
              <Field
                className={`contactForm__textarea input ${
                  errors.message && touched.message ? "input--error" : ""
                }`}
                name="message"
                as="textarea"
                placeholder="Write your message..."
              />
              <ErrorMessage
                className="text--error"
                name="message"
                component="p"
              />
            </div>
            <button className="btn contactForm__button" type="submit">
              Send Message
            </button>
          </Form>
        )}
      </Formik>
      {showAlert && (
        <Alert
          message={alertMessage}
          status={alertStatus}
          handleClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default ContactForm;
