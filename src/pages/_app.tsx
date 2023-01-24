import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

import localFont from "@next/font/local";

const glysa = localFont({ src: "./Glysa.otf", variable: "--font-glysa" });
const lexend = localFont({
  src: "./LexendDeca-VariableFont_wght.ttf",
  variable: "--font-lexend",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${glysa.variable} ${lexend.variable}`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
