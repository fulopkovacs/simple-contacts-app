import { Button } from "./Button";
import { Headline2, Message } from "./Typography";
import Image from "next/image";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import type {
  ReactNode,
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { EditContactDialogContext } from "../pages";
import { AnimatePresence, motion } from "framer-motion";
import PhoneNumberInput from "react-phone-number-input/input";
import type { Value as E164Number } from "react-phone-number-input";
import { api } from "../utils/api";
import { userId } from "./constants";

function InputLabel({
  children,
  className,
  ...props
}: { children: ReactNode } & DetailedHTMLProps<
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

// This function was borrowed from Arun Killu:
// https://stackoverflow.com/a/18650249
function blobToBase64(blob: File) {
  return new Promise<string>((resolve) => {
    // TODO: It's probably not a good idea to create a new FileReader() everytime this function is executed
    const reader = new FileReader();
    // TODO: remove this type casting if possible
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export function EditContactDialog() {
  const utils = api.useContext();
  const {
    isContactDialogOpen,
    setIsContactDialogOpen,
    editedContact,
    setEditedContact,
  } = useContext(EditContactDialogContext);

  const title = editedContact ? "Edit contact" : "Add contact";

  const [profilePhoto, setProfilePhoto] = useState<File | undefined | string>();

  const profilePictureURL = useMemo(
    () =>
      profilePhoto instanceof File
        ? URL.createObjectURL(profilePhoto)
        : profilePhoto,
    [profilePhoto]
  );

  const [phoneNumber, setPhoneNumber] = useState<E164Number>();
  const [name, setName] = useState(editedContact?.name || "");
  const [isNameMissing, setIsNameMissing] = useState(false);
  const [email, setEmail] = useState("");
  const [imageTooBigMessage, setImageTooBigMessage] = useState(false);

  useEffect(() => {
    setProfilePhoto(editedContact?.profilePhoto || undefined);
    setName(editedContact?.name || "");
    setPhoneNumber(editedContact?.phone || "");
    setEmail(editedContact?.email || "");
  }, [editedContact, setEditedContact]);

  function closeDialog() {
    setProfilePhoto(undefined);
    setIsContactDialogOpen(false);
    setName("");
    setPhoneNumber("");
    setEmail("");
    setIsNameMissing(false);
    setEditedContact(undefined);
  }

  const contactMutation = api.contacts.upsertContact.useMutation({
    onSuccess: async () => {
      await utils.contacts.invalidate();
      closeDialog();
    },
    onError: (error) => {
      // TODO: do something with the errors
      console.log(error);
    },
  });

  async function saveAndCloseDialog() {
    if (
      // `name` cannot be `undefined`
      name &&
      // Image size shouldn't be over 4MB
      !imageTooBigMessage
    ) {
      contactMutation.mutate({
        name,
        email,
        userId,
        contactId: editedContact?.id,
        phone: phoneNumber,
        // TODO: make sure that the size of profilePhoto does not exceed 4MB
        profilePhoto:
          profilePhoto instanceof File
            ? await blobToBase64(profilePhoto)
            : profilePhoto,
      });
    } else {
      if (!name) setIsNameMissing(true);
    }
  }

  function handleImageFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const [imageFile] = event.target.files;
      /*
       Technicallly I the size limit for the size of the **full** payload is 6mb.
       This is just a demo, but in production I would have to check the size of the
       whole request payload, not just the size of the image.
      */
      setImageTooBigMessage(!imageFile || imageFile.size > 4000000);
      setProfilePhoto(imageFile);
    }
  }

  const filePickerInput = useRef<HTMLInputElement>(null);

  if (!isContactDialogOpen) return <></>;

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
            role={"dialog"}
            className="z-10 grid w-[364px] gap-6 rounded-lg bg-g-100 p-6 text-white"
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
            <Headline2 id="add-contact-dialog-title">{title}</Headline2>
            <div className="flex items-center gap-4">
              <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full">
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
              <div>
                <input
                  onChange={handleImageFile}
                  ref={filePickerInput}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
                {profilePictureURL ? (
                  <motion.div
                    className="relative flex justify-end gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="change-picture-button"
                  >
                    <Button
                      autoFocus
                      iconSrc="/icons/Change.svg"
                      primary
                      aria-label="Add picture"
                      onClick={() => {
                        filePickerInput.current?.click();
                      }}
                    >
                      Change picture
                    </Button>
                    <Button
                      primary
                      iconSrc="/icons/Delete.svg"
                      onClick={() => {
                        setProfilePhoto(undefined);
                      }}
                    />
                    {imageTooBigMessage && (
                      <motion.div
                        key="image-too-big-message"
                        className="absolute left-0 -bottom-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Message className="text-red-400">
                          Select an image under 4 MB!
                        </Message>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="add-picture-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                  </motion.div>
                )}
              </div>
            </div>
            <fieldset>
              <InputLabel htmlFor="contact-name">
                Name
                <span
                  className={`opacity-0 transition-opacity ${
                    isNameMissing ? "text-red-400 opacity-100" : ""
                  }`}
                >
                  {" "}
                  *Required
                </span>
              </InputLabel>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => {
                  const { value } = e.target;
                  setIsNameMissing(!value);
                  setName(value);
                }}
                placeholder="Jamie Wright"
                type={"text"}
                className={
                  isNameMissing ? "border-red-400 transition-colors" : ""
                }
              />
            </fieldset>
            <fieldset>
              <InputLabel htmlFor="contact-phone">Phone number</InputLabel>
              <PhoneNumberInput
                id="contact-phone"
                placeholder="+01 234 5678"
                value={phoneNumber}
                onChange={setPhoneNumber}
                type={"tel"}
              />
            </fieldset>
            <fieldset>
              <InputLabel htmlFor="contact-email">Email address</InputLabel>
              <Input
                id="contact-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                  void saveAndCloseDialog();
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
