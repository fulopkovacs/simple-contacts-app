import { type NextPage } from "next";
import Head from "next/head";
import { createContext, useState } from "react";
import { EditContactDialog } from "../components/EditContactDialog";
import { ContactsList } from "../components/ContactsList";
import { NavBar } from "../components/NavBar";
import { PageContent } from "../components/PageContent";
import { PageWrapper } from "../components/PageWrapper";
import { Contact } from "@prisma/client";

type EditContactDialogContextType = {
  isContactDialogOpen: boolean;
  setIsContactDialogOpen: (arg: boolean) => void;
  editedContact?: Contact;
  setEditedContact: (contact?: Contact) => void;
};

export const EditContactDialogContext =
  createContext<EditContactDialogContextType>({
    isContactDialogOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsContactDialogOpen: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setEditedContact: () => {},
  });
EditContactDialogContext.displayName = "EditContactDialogContext";

const Home: NextPage = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [editedContact, setEditedContact] = useState<Contact | undefined>();

  return (
    <>
      <Head>
        <title>Contacts</title>
        <meta name="description" content="Simple contacts app demo" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <PageWrapper>
        <EditContactDialogContext.Provider
          value={{
             isContactDialogOpen,
             setIsContactDialogOpen,
            editedContact,
            setEditedContact,
          }}
        >
          <NavBar />
          <PageContent>
            <ContactsList />
          </PageContent>
          <EditContactDialog />
        </EditContactDialogContext.Provider>
      </PageWrapper>
    </>
  );
};

export default Home;
