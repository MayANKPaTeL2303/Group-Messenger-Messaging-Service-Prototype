import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chat-Room",
  description: "Let Boom, the Room ",
};
// suppressHydrationWarning={true}: This prevents from showing hydration mismatch warnings when rendering the app on the client-side.
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}> 
      <AuthProvider>
        <body
          suppressHydrationWarning={true}
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
