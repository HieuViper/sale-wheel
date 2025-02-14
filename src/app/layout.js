import ProvidersProgressBar from "@/components/ProgressBarProvider";
import { ThemeProvider } from "@/components/theme-provider";
import StyledComponentsRegistry from "@/lib/registry";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const utf_avo = localFont({
  src: [
    {
      path: "../../public/font/UTM_Avo.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/UTM_AvoItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/font/UTM_AvoBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/UTM_AvoBold_Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-utf-avo",
});

export const metadata = {
  title: "Vòng Quay May Mắn",
  description:
    "Zadez phối hợp với AEON cùng làm chương trình vòng quay may mắn đầu năm 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${utf_avo.variable} antialiased`}>
        <StyledComponentsRegistry>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProvidersProgressBar>{children}</ProvidersProgressBar>
            <Toaster position="top-right" />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
