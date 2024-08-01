import Gallery from "@/components/pages/gallery";
import Container from "@/components/shared/container";
import "@/styles/components/pages/gallery.scss";

function page() {
  return (
    <div className="gallery">
      <Container maxWidth="xlg">
        <Gallery />
      </Container>
    </div>
  );
}

export default page;
