import { useContext } from "react";
import { ContactDialogContext } from "../pages";
import { EditContactButton, Button } from "./Button";
import { Headline1 } from "./Typography";

export function NavBarButtonWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`items-center md:mt-24 md:h-24 md:border-y md:border-g-60 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

/**
The navigation bar.
*/
export function NavBar() {
  const { setIsContactDialogOpen: setIsDialogOpen } = useContext(
    ContactDialogContext
  );

  return (
    <div className="sticky top-0 z-20 w-full flex-grow-0 border-g-60 bg-g-100">
      <div className="visible my-2 flex pl-4 pr-6 sm:pr-20 sm:pl-[70px] md:hidden">
        <NavBarButtonWrapper className="flex w-full justify-start">
          <Button iconSrc="/icons/Back-arrow.svg"></Button>
        </NavBarButtonWrapper>
        <NavBarButtonWrapper className="flex w-full justify-end">
          <Button iconSrc="/icons/Light-mode.svg"></Button>
        </NavBarButtonWrapper>
      </div>
      <div className="w-full md:grid md:grid-cols-navbar">
        <NavBarButtonWrapper className="hidden justify-end pr-6 md:flex">
          <Button iconSrc="/icons/Back-arrow.svg"></Button>
        </NavBarButtonWrapper>
        <div className="flex items-center gap-6 border-g-60 md:w-[600px] md:border-x md:pt-24 lg:w-[720px]">
          <div className="grid w-full grid-cols-2 items-center gap-6 border-y border-g-60 p-6 sm:px-20 md:flex md:h-24 md:flex-row md:px-6">
            <Headline1 className="w-full">Contacts</Headline1>
            <div className="flex justify-end gap-2">
              <Button iconSrc="/icons/Settings.svg" />
              <Button iconSrc="/icons/Profile-pic.png"></Button>
            </div>
            <EditContactButton
              className="max-w-fit"
              onClick={() => setIsDialogOpen(true)}
            >
              Add new
            </EditContactButton>
          </div>
        </div>
        <NavBarButtonWrapper className="hidden justify-start pl-6 md:flex">
          <Button iconSrc="/icons/Light-mode.svg"></Button>
        </NavBarButtonWrapper>
      </div>
    </div>
  );
}
