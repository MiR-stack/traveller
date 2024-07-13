import Container from "../../../shared/container";
import SectionTitle, {
  sectionTitlePropTypes,
} from "../sectionTitle/sectionTitle";

interface sectionLayoutPropTypes extends sectionTitlePropTypes {
  children: React.ReactNode;
  background?: "bg1" | "bg2";
}

function SectionLayout({
  title,
  description,
  children,
  background = "bg1",
}: sectionLayoutPropTypes) {
  return (
    <section className={`section_layout section_layout-${background}`}>
      <Container maxWidth="xlg">
        <SectionTitle title={title} description={description} />
        {children}
      </Container>
    </section>
  );
}

export default SectionLayout;
