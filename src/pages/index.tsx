import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";
import { NavBar } from "../components/NavBar";
import {
  Body,
  Headline1,
  Headline2,
  Headline3,
  Message,
} from "../components/Typography";

import { api } from "../utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
        <meta name="description" content="Simple contacts app demo" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />
      <div className="flex w-full justify-center">
        <div className="min-h-screen w-[720px] border-x border-g-60">
          content
        </div>
      </div>
    </>
  );
};

export default Home;
