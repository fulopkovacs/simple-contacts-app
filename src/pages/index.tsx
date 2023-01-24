import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AddContactButton, Button } from "../components/Button";
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
          <div className="flex w-min flex-col gap-2 p-2">
            <Button>Add new</Button>
            <Button variant="primary">Add new</Button>
            <Button variant="primary" iconSrc="/icons/Add.svg">
              Add new
            </Button>
            <Button variant="primary" iconSrc="/icons/Add.svg"></Button>
            <AddContactButton
            >
              Add new
            </AddContactButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
