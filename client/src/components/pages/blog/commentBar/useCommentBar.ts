import { useAddCommentMutation } from "@/store/api/commentApi";
import { useEffect, useState } from "react";

interface guestTypes {
  name: string;
  email: string;
  website?: string;
}

interface featureTypes {
  saveInfo: boolean;
}

export interface submitFnTypes {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

function useCommentBar({
  blogId,
  commentId,
  refetch,
}: {
  blogId: number;
  commentId?: number;
  refetch: () => void;
}) {
  // handle guest user

  const initGuestData = {
    name: "",
    email: "",
    website: "",
  };
  const [guest, setGuest] = useState<guestTypes>({ ...initGuestData });

  const { name, email, website } = guest;

  useEffect(() => {
    const guest = localStorage.getItem("guest");

    if (guest) {
      setGuest(JSON.parse(guest));
    }
  }, []);

  const handleGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle feauters
  const [feature, setFeature] = useState<featureTypes>({ saveInfo: true });

  const handleFeature = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeature((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name as keyof typeof feature],
    }));
  };

  // handle comment
  const [comment, setComment] = useState<string>();

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // handle error

  const initEror = {
    name: "",
    email: "",
    comment: "",
  };
  const initTouched = {
    name: false,
    email: false,
    comment: false,
  };

  const [error, setError] = useState({ ...initEror });
  const [touched, setTouched] = useState({ ...initTouched });

  useEffect(() => {
    if (touched.comment || touched.name || touched.email) {
      if (!comment) {
        setError((prev) => ({ ...prev, comment: "please enter your comment" }));
      } else {
        setError((prev) => ({ ...prev, comment: "" }));
      }

      if (!name) {
        setError((prev) => ({ ...prev, name: "please enter your name" }));
      } else {
        setError((prev) => ({ ...prev, name: "" }));
      }

      const emailValidateReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!email) {
        setError((prev) => ({ ...prev, email: "please enter your email" }));
      } else if (!emailValidateReg.test(email)) {
        setError((prev) => ({
          ...prev,
          email: "please provide a valid email",
        }));
      } else {
        setError((prev) => ({ ...prev, email: "" }));
      }
    }
  }, [touched, comment, name, email]);

  const [addComment, { isLoading, isError, isSuccess }] =
    useAddCommentMutation();

  const userToken = null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      comment: true,
    });

    if (!comment) return;

    if (!userToken && (!email || !name)) return;

    await addComment({
      id: blogId,
      content: comment,
      token: userToken || process.env.NEXT_PUBLIC_API_TOKEN!,
      author: {
        //TODO: id will be changed
        id: "guest_user",
        email,
        name,
      },
      threadOf: commentId,
    });

    if (feature.saveInfo) {
      localStorage.setItem("guest", JSON.stringify(guest));
    } else {
      localStorage.setItem("guest", JSON.stringify({ ...initGuestData }));
      setGuest({ ...initGuestData });
    }
    setComment("");
    setTouched({ ...initTouched });
    refetch();
  };

  return {
    handleComment,
    handleFeature,
    handleGuest,
    handleSubmit,
    error,
    name,
    email,
    website,
    comment,
    feature,
    userToken,
  };
}

export default useCommentBar;
