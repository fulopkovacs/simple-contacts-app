import * as Dialog from "@radix-ui/react-dialog";
import { AddContactButton, Button } from "./Button";
import { Headline2, Message } from "./Typography";
import Image from "next/image";
import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

function TextInputLabel({
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

function TextInput({
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

export function AddContactDialogButton({ children }: { children: string }) {
  return (
    <Dialog.Root modal defaultOpen>
      <Dialog.Trigger asChild>
        <AddContactButton>{children}</AddContactButton>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed top-0 left-0 z-20 h-screen w-screen bg-black opacity-40"></Dialog.Overlay>
      <Dialog.Content className="fixed top-1/2 left-1/2 z-30 grid w-96 -translate-x-1/2 -translate-y-1/2 gap-6 bg-g-100 p-6 text-white">
        <Dialog.Title asChild>
          <Headline2>Add contact</Headline2>
        </Dialog.Title>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full">
            <Image
              src="/profile-pics/Default.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <Button iconSrc="/icons/Add.svg" primary>
            Add picture
          </Button>
        </div>
        <fieldset>
          <TextInputLabel htmlFor="contact-name">Name</TextInputLabel>
          <TextInput
            id="contact-name"
            placeholder="Jamie Wright"
            type={"text"}
          />
        </fieldset>
        <fieldset>
          <TextInputLabel htmlFor="contact-phone">Name</TextInputLabel>
          <TextInput
            id="contact-phone"
            placeholder="+01 2345678"
            type={"text"}
          />
        </fieldset>
        <fieldset>
          <TextInputLabel htmlFor="contact-email">Name</TextInputLabel>
          <TextInput
            id="contact-email"
            placeholder="jamie.wright@mail.com"
            type={"text"}
          />
        </fieldset>
        <div className="flex justify-end gap-2 pt-6">
          <Dialog.Close asChild>
            <Button>Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button primary>Done</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
