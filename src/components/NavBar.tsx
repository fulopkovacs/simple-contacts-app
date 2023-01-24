import { Headline1 } from "./Typography";

export function NavBar() {
  return (
    <div className="grid w-full grid-cols-navbar grid-rows-2 border-b border-g-60">
      <div className=""></div>
      <div className="border-x border-g-60"></div>
      <div className=""></div>
      <div className="border-t border-g-60"></div>
      <div className="flex w-[720px] items-center border-x border-t border-g-60 p-[24px]">
        <Headline1>Contacts</Headline1>
      </div>
      <div className="border-t border-g-60"></div>
    </div>
  );
}
