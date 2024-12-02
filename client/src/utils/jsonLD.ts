interface JsonLdTypes {
  headline: string;
  description: string;
  keywords: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  url: string;
  authorName: string;
}

const generateJsonLD = (data: JsonLdTypes) => {
  const {
    headline,
    description,
    keywords,
    createdAt,
    updatedAt,
    image,
    url,
    authorName,
  } = data;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    keywords,
    datePublished: createdAt,
    dateModified: updatedAt,
    image: image,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "heavenjourney",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/du2jmkqrk/image/upload/v1729930405/thumbnail_mobile_logo_3ba3940fd2.png",
        width: 60,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
};

export default generateJsonLD;
