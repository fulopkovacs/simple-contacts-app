import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";
import {
  Body,
  Headline1,
  Headline2,
  Headline3,
  Message,
} from "../components/Typography";

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
      <div className="">
        <Headline1>Headline 1. Used for titles</Headline1>
        <Headline2>Headline 2. Used for subtitles</Headline2>
        <Headline3>
          Headline 3. Used for highlighting text in simple components
        </Headline3>
        <Body>Body. Used for interactive elements</Body>
        <Message className="opacity-secondary">
          Message. Used for displaying exetensive info
        </Message>
        <Message className="opacity-disabled">This message is disabled</Message>
        <Button onClick={() => alert("hi")}>This is a button</Button>
      </div>
    </>
  );
};

export default Home;
