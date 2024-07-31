"use client";
import Typography from "@/components/shared/typography";
import { ErrorMessage, Field, Form, Formik } from "formik";

function ContactForm() {
  const initValues = {
    name: "",
    email: "",
    message: "",
  };

  interface errorsType {
    name?: string;
    email?: string;
    message?: string;
  }

  const validate = (values: typeof initValues) => {
    let errors: errorsType = {};

    if (!values.name) {
      errors.name = "please enter your name";
    }

    if (!values.email) {
      errors.email = "please enter your email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "please enter a valid email";
    }

    if (!values.message) {
      errors.message = "please enter your message";
    }

    return errors;
  };

  const handleSubmit = (values: typeof initValues) => {
    console.log(values);
  };

  return (
    <div className="contactForm">
      <Typography className="contactForm__title" variant="h2">
        contact us
      </Typography>
      <Typography className="contactForm__subTitle" variant="body1">
        Your satisfaction is our top priority. Contact us for personalized
        travel support.
      </Typography>
      <Formik
        initialValues={initValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="contactForm__form">
            <div className="contactForm__input--wraper">
              <Field
                className={`contactForm__input input ${
                  errors.name ? "input--error" : ""
                }`}
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                className="text--error"
                name="name"
                component={"p"}
              />
            </div>
            <div className="contactForm__input--wraper">
              <Field
                className={`contactForm__input input ${
                  errors.email ? "input--error" : ""
                }`}
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                className="text--error"
                name="email"
                component={"p"}
              />
            </div>
            <div className="contactForm__textarea--wraper">
              <Field
                className={`contactForm__textarea input ${
                  errors.message ? "input--error" : ""
                }`}
                name="message"
                as="textarea"
                placeholder="Write your message..."
              />
              <ErrorMessage
                className="text--error"
                name="message"
                component={"p"}
              />
            </div>
            <button className="btn contactForm__button" type="submit">
              send message
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactForm;
