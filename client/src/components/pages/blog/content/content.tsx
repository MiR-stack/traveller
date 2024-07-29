import Author from "../author";
import { authorPropsType } from "../author/author";
// import Comments from "../comments";
import RelatedBlogs from "../relatedBlogs";
import ContentFooter from "./contentFooter";

interface contentPropsType {
  content: string;
  author: authorPropsType;
}

function Content({ content, author }: contentPropsType) {
  return (
    <div className="blog-content">
      <article
        className="blog-content-main"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <ContentFooter url="" />
      <Author {...author} />
      <RelatedBlogs />
      {/* <Comments blogId={1} /> */}
    </div>
  );
}

export default Content;
