import Typography from "../../../shared/typography/typography";

export interface sectionTitlePropTypes {
  title: string;
  description?: string;
}

function SectionTitle({ title, description }: sectionTitlePropTypes) {
  return (
    <div className="section_title">
      <Typography className="section_title-title" variant="h1">
        {title}
      </Typography>
      {description ? (
        <Typography className="section_title-description" variant="body2">
          {description}{" "}
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
}

export default SectionTitle;
