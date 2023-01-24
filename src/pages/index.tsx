import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.contacts.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Contacts</title>
        <meta name="description" content="Simple contacts app demo" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="">
        <div className="">Contacts app</div>
      </main>
    </>
  );
};

export default Home;
