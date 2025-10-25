import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Theme } from "@radix-ui/themes";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    	<Theme>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </Theme>
    </>
  );
}
