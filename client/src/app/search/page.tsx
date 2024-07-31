import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Banner from "@/components/pages/search/banner";
import Blogs from "@/components/pages/search/blogs";
import Container from "@/components/shared/container";
import "@/styles/components/pages/search.scss";

function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="search">
      <Navbar />
      <Container maxWidth="lg">
        <Banner blogCount={0} />
        <Blogs />
      </Container>
      <Footer />
    </div>
  );
}

export default page;
