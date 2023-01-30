import type { Contact } from "@prisma/client";
import { api } from "../utils/api";
import { Body, Headline3, Message } from "./Typography";
import Image from "next/image";
import { Button } from "./Button";
import { useContext, useState } from "react";
import { ContactDialogContext } from "../pages";
import { AnimatePresence, motion } from "framer-motion";
import { userId } from "./constants";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { formatPhoneNumberIntl } from "react-phone-number-input";

export function ContactDropdownMenu({
  contact,
  dropdownMenuOpen,
  setDropdownMenuOpen: setDropdownMenuOpen,
}: {
  contact: Contact;
  dropdownMenuOpen: boolean;
  setDropdownMenuOpen: (newValue: boolean) => void;
}) {
  const utils = api.useContext();
  const deleteContactMutation = api.contacts.deleteContact.useMutation({
    onSuccess: async () => {
      await utils.contacts.invalidate();
    },
  });
  const { setEditedContact, setIsContactDialogOpen } =
    useContext(ContactDialogContext);
  /*
  NOTE: This code could be simplified by creating components from the repetitive parts,
  but I think it would make the reviewers' work harder (too many components to keep in mind),
  so I'll just leave this here.
  */
  return (
    <DropdownMenu.Root
      open={dropdownMenuOpen}
      onOpenChange={setDropdownMenuOpen}
    >
      <DropdownMenu.Trigger
        className={`type-body flex aspect-square h-10 w-max items-center justify-center gap-2 rounded-lg outline-none transition-colors hover:bg-g-90 active:bg-g-80 ${
          dropdownMenuOpen ? "bg-g-80" : "bg-g-100"
        }`}
      >
        <span className="relative inline-block h-6 w-6">
          <Image src={"/icons/More.svg"} alt="" fill priority />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="mt-3 w-[219px] overflow-hidden rounded-lg bg-g-80"
        align="start"
      >
        <DropdownMenu.Item
          className="active:bg-60 flex items-center gap-3 p-3 outline-none transition-opacity hover:cursor-pointer hover:bg-g-70"
          onClick={() => {
            setEditedContact(contact);
            setIsContactDialogOpen(true);
          }}
        >
          <div className="relative inline-block h-6 w-6 opacity-secondary">
            <Image src={"/icons/Settings.svg"} alt="" fill priority />
          </div>
          <Body className="touch-none select-none">Edit</Body>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="active:bg-60 flex items-center gap-3 p-3 outline-none transition-opacity hover:cursor-pointer hover:bg-g-70">
          <div className="relative inline-block h-6 w-6 opacity-secondary">
            <Image src={"/icons/Favourite.svg"} alt="" fill priority />
          </div>
          <Body className="touch-none select-none">Favourite</Body>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="active:bg-60 flex items-center gap-3 p-3 outline-none hover:cursor-pointer hover:bg-g-70"
          onClick={() => {
            deleteContactMutation.mutate({ contactId: contact.id });
          }}
        >
          <div className="relative inline-block h-6 w-6 opacity-secondary transition-opacity">
            <Image src={"/icons/Delete.svg"} alt="" fill />
          </div>
          <Body className="touch-none select-none">Remove</Body>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export function ContactListItem({ contact }: { contact: Contact }) {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  return (
    <motion.div
      layoutId={contact.id}
      key={contact.id}
      className="group/contact flex w-full items-center gap-4 py-3 first:pt-0"
    >
      <div className="relative h-10 w-10 min-w-[40px] overflow-hidden rounded-full">
        <Image
          src={contact.profilePhoto || "/profile-pics/Default.png"}
          fill
          alt=""
          className="object-cover"
        />
      </div>
      <div>
        <Headline3>{contact.name}</Headline3>
        <Message className="opacity-secondary">
          {contact.phone ? formatPhoneNumberIntl(contact.phone) : "-"}
        </Message>
      </div>
      <div
        className={`flex flex-grow items-center justify-end gap-2 transition-opacity group-hover/contact:opacity-100 ${
          dropdownMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button iconSrc="/icons/Mute.svg" />
        <Button iconSrc="/icons/Call.svg" />
        <ContactDropdownMenu
          contact={contact}
          setDropdownMenuOpen={setDropdownMenuOpen}
          dropdownMenuOpen={dropdownMenuOpen}
        />
      </div>
    </motion.div>
  );
}

export function ContactsList() {
  const contactsQuery = api.contacts.getAllContacts.useQuery({ userId });
  const { setIsContactDialogOpen: dialogOpen } =
    useContext(ContactDialogContext);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <AnimatePresence>
        {contactsQuery.isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="error"
            layoutId="error"
          >
            <Body>Something went wrong.</Body>
          </motion.div>
        )}
        {contactsQuery.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="loading"
            layoutId="loading"
          >
            {/**
            NOTE: Normally I'd use a loading spinner here, but now I won't,
            because you would barely even see it if you ran this project locally.
            And this won't get depoloyed, so...
            I'm gonna be lazy here ^^.
            */}
            <Body className="animate-pulse">Loading...</Body>
          </motion.div>
        )}
        {contactsQuery.data?.length === 0 && (
          <motion.div
            key="no-contacts"
            layoutId="no-contacts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <Body className="pb-4">You currently have no contacts.</Body>
            <Button
              primary
              iconSrc="/icons/Add.svg"
              onClick={() => dialogOpen(true)}
            >
              Add new contact
            </Button>
          </motion.div>
        )}
        {contactsQuery.data?.map((contact) => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      </AnimatePresence>
    </div>
  );
}
