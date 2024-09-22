// app/layout.js
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Kids Learning App",
  description: "Kids games and a place where kids can learn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={poppins.className}>
        <Navbar />
        <div className="p-8">{children}</div>
      </body>
    </html>
  );
}
