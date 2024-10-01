import Typography from "@/components/shared/typography";

interface sectionLayoutPropsType {
  title: string;
  className?: string;
  children: React.ReactNode;
}

function SectionLayout({ title, className, children }: sectionLayoutPropsType) {
  return (
    <section className={`blog-section ${className ?? ""}`}>
      <Typography className="blog-section__title" variant="h3" component="h1">
        {title}
      </Typography>
      {children}
    </section>
  );
}

export default SectionLayout;
