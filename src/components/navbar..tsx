"use client";
import LogoKanim from "@/../public/images/logo-kanim.png";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from "@heroui/react";
import { Settings } from "lucide-react";
import Image from "next/image";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavHeader() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Image src={LogoKanim} width={50} height={50} alt="logo kanim" className="mr-3" />
        <p className="font-bold text-inherit">IM-Absensi</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" isIconOnly radius="lg">
                <Settings size={17} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownSection showDivider>
                <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
                  <User
                    avatarProps={{
                      size: "sm",
                      src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    }}
                    classNames={{
                      name: "text-default-600",
                      description: "text-default-500",
                    }}
                    description="@jrgarciadev"
                    name="Junior Garcia"
                  />
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
