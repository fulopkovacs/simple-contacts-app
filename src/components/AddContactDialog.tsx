import { Button } from "./Button";
import { Headline2, Message } from "./Typography";
import Image from "next/image";
import { useContext, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { AddContactDialogContext } from "../pages";
import { AnimatePresence, motion } from "framer-motion";

function InputLabel({
  children,
  className,
  ...props
}: { children: string } & DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return (
    <label className={`mb-1 block ${className || ""}`} {...props}>
      <Message className="opacity-secondary">{children}</Message>
    </label>
  );
}

function Input({
  className,
  ...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-g-60 bg-g-80 px-3 py-[11px] outline-none placeholder:opacity-disabled ${
        className || ""
      }`}
      {...props}
    />
  );
}

export function AddContactDialog() {
  // const [dialogOpen, setIsDialogOpen] = useState(true);
  const { isOpen: dialogOpen, setIsOpen: setIsDialogOpen } = useContext(
    AddContactDialogContext
  );

  const [profilePicture, setProfilePicture] = useState<File | undefined>(
    undefined
  );

  const profilePictureURL = useMemo(
    () => (profilePicture ? URL.createObjectURL(profilePicture) : undefined),
    [profilePicture]
  );

  function closeDialog() {
    setProfilePicture(undefined);
    setIsDialogOpen(false);
  }

  function handleImageFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const [imageFile] = event.target.files;
      setProfilePicture(imageFile);
    }
  }

  const filePickerInput = useRef<HTMLInputElement>(null);

  if (!dialogOpen) return <></>;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed top-0 left-0 z-20 h-screen w-screen bg-black opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          key="add-contact-dialog-overlay"
        />
        <div
          className="top fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-transparent"
          onClick={
            // Close the dialog when user clicks outside of the dialog
            () => closeDialog()
          }
        >
          <motion.div
            aria-labelledby="add-contact-dialog-title"
            role={"dialog"}
            className="fixed z-30 grid w-96 -translate-x-1/2 -translate-y-1/2 gap-6 bg-g-100 p-6 text-white"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
            onKeyUp={(e) => {
              // Close the dialog with "Esc"
              if (e.key === "Escape") {
                closeDialog();
                e.stopPropagation();
              }
            }}
            key="add-contact-dialog-content"
            onClick={
              // Do not close the dialog if it is clicked
              (e) => e.stopPropagation()
            }
          >
            <Headline2 id="add-contact-dialog-title">Add contact</Headline2>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <motion.div
                  className="absolute h-full w-full overflow-hidden rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  key={profilePictureURL || "default-profile-pic"}
                >
                  <Image
                    src={profilePictureURL || "/profile-pics/Default.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <input
                onChange={handleImageFile}
                ref={filePickerInput}
                type="file"
                className="hidden"
                accept="image/*"
              />
              <Button
                autoFocus
                iconSrc="/icons/Add.svg"
                primary
                aria-label="Add picture"
                onClick={() => {
                  filePickerInput.current?.click();
                }}
              >
                Add picture
              </Button>
            </div>
            <fieldset>
              <InputLabel htmlFor="contact-name">Name</InputLabel>
              <Input
                id="contact-name"
                placeholder="Jamie Wright"
                type={"text"}
              />
            </fieldset>
            <fieldset>
              <InputLabel htmlFor="contact-phone">Name</InputLabel>
              // TODO: Create a phone input
              <Input
                id="contact-phone"
                placeholder="+01 2345678"
                type={"tel"}
              />
            </fieldset>
            <fieldset>
              <InputLabel htmlFor="contact-email">Name</InputLabel>
              <Input
                id="contact-email"
                placeholder="jamie.wright@mail.com"
                type={"text"}
              />
            </fieldset>
            <div className="flex justify-end gap-2 pt-6">
              <Button
                onClick={() => {
                  closeDialog();
                }}
              >
                Cancel
              </Button>
              <Button
                primary
                onClick={() => {
                  closeDialog();
                }}
              >
                Done
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}
