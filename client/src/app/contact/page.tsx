import ContactForm from "@/components/pages/contact/form/contactForm";
import Map from "@/components/pages/contact/map";
import Container from "@/components/shared/container";
import "@/styles/components/pages/contact.scss";

function page() {
  return (
    <div className="contact">
      <Container maxWidth="lg">
        <Map />
        <ContactForm />
      </Container>
    </div>
  );
}

export default page;
