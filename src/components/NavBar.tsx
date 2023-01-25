import { AddContactButton, Button } from "./Button";
import { Headline1 } from "./Typography";

/**
The navigation bar.
*/
export function NavBar() {
  return (
    <div className="grid w-full grid-cols-navbar grid-rows-2 border-b border-g-60">
      <div className=""></div>
      <div className="border-x border-g-60"></div>
      <div className=""></div>
      <div className="flex items-center justify-end border-t border-g-60 pr-6">
        <Button iconSrc="/icons/Back-arrow.svg"></Button>
      </div>
      <div className="flex w-[720px] items-center gap-6 border-x border-t border-g-60 p-6">
        <Headline1 className="w-full">Contacts</Headline1>
        <div className="flex gap-2">
          <Button iconSrc="/icons/Settings.svg" />
          <Button iconSrc="/icons/Profile-pic.png"></Button>
        </div>
        <AddContactButton>Add new</AddContactButton>
      </div>
      <div className="flex items-center justify-start border-t border-g-60 pl-6">
        <Button iconSrc="/icons/Light-mode.svg"></Button>
      </div>
    </div>
  );
}
