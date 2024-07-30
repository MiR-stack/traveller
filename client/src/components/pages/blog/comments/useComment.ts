import { commentTypes } from "@/types/blog.types";
import { formatDistanceToNowStrict } from "date-fns";
import React, {
  createRef,
  CSSProperties,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface useCommentPropsType {
  children: commentTypes[];
  createdAt: Date;
}

function useComment({ children, createdAt }: useCommentPropsType) {
  const time = formatDistanceToNowStrict(createdAt, {
    addSuffix: true,
  });

  //   handle reply bar
  const [reply, setReply] = useState<boolean>(false);

  const replyOpen = () => setReply(true);

  //   handle comment line styles

  const btnRef = useRef<HTMLButtonElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const [styles, setStyles] = useState<React.CSSProperties>();

  const style = useCallback(() => {
    if (children.length > 0) {
      setStyles({
        height: `${
          btnRef.current?.offsetHeight! + commentRef.current?.offsetHeight! - 37
        }px`,
        width: `${(btnRef.current?.offsetLeft || 1) / 2}px`,
        top: `50px`,
        left: `25px`,
      });
    }
  }, [children.length]);

  // handle reply line styles
  const [childRefs, setChildRefs] = useState<RefObject<HTMLDivElement>[]>([]);
  useLayoutEffect(() => {
    if (reply) {
      let refs: RefObject<HTMLDivElement>[] = [];
      children.forEach((_, index) => {
        refs[index] = createRef<HTMLDivElement>();
      });
      setChildRefs(refs);
    }
  }, [reply, children]);

  const Styles = useCallback(() => {
    let childStyles: CSSProperties[] = [];

    if (childRefs[0]?.current) {
      childRefs.forEach((child, index) => {
        let childStyle = {
          height: `${
            child.current?.offsetHeight! +
            commentRef.current?.offsetHeight! -
            37
          }px`,
          width: `${child.current?.offsetLeft! / 2 + 5}px`,
          top: `50px`,
          left: `25px`,
        };

        if (index > 0) {
          childStyle.height = `${
            childRefs[index - 1].current?.offsetHeight! + 28
          }px`;

          childStyle.top = `${
            child.current?.offsetTop! -
            childRefs[index - 1].current?.offsetHeight! -
            8
          }px`;
        } else {
          childStyle.height = `${commentRef.current?.offsetHeight! - 10}px`;
        }

        childStyles[index] = childStyle;
      });
    }

    return childStyles;
  }, [childRefs]);

  const [childStyles, setChildStyles] = useState<CSSProperties[]>([]);

  useEffect(() => {
    const cb = () => {
      setChildStyles(Styles());
      style();
    };
    cb();

    window.addEventListener("resize", cb);

    return () => window.removeEventListener("resize", cb);
  }, [childRefs, Styles, style]);

  return {
    commentRef,
    btnRef,
    styles,
    childRefs,
    childStyles,
    replyOpen,
    reply,
    time,
  };
}

export default useComment;
