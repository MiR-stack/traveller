import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer bg="bg2" />
    </div>
  );
}

export default layout;
