import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Nav from "@/app/components/Nav"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "画像フィルタアプリ",
  description: "選択した画像にフィルタリングをかけることができます。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <>
          <div className="lg:flex items-center fixed top-0 left-0 hidden md:block md:w-[calc((100%_-_360px)/4*1)] lg:w-[calc((100%_-_768px)/2)] h-dvh bg-blue-200"></div>
          <div className="max-w-[500px] md:w-[360px] md:max-w-full lg:w-[768px] md:mx-auto lg:ml-auto h-dvh mx-auto place-items-center">
            <Header />
            <Nav />
            <div className="bg-ivory">{children}</div>
          </div>
          <div className="lg:flex items-center fixed top-0 right-0 hidden md:block md:w-[calc((100%_-_360px)/4*1)] lg:w-[calc((100%_-_768px)/2)] h-dvh bg-blue-200"></div>
        </>
      </body>
    </html>
  );
}
