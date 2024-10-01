import { strapiDataResTypes } from "@/types";
import Author from "../author";
import { authorPropsType } from "../author/author";
import Comments from "../comments";
import RelatedBlogs from "../relatedBlogs";
import ContentFooter from "./contentFooter";
import "ckeditor5/ckeditor5.css";

interface contentPropsType {
  content: string;
  author: authorPropsType;
  url: string;
  title: string;
  blogs: strapiDataResTypes[];
  id: number;
}

function Content({ content, author, url, title, blogs, id }: contentPropsType) {
  return (
    <div className="blog-content">
      <article
        className="blog-content__main ck-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <ContentFooter url={url} title={title} />
      <Author {...author} />
      <RelatedBlogs blogs={blogs} id={id} />
      <Comments blogId={id} />
    </div>
  );
}

export default Content;
