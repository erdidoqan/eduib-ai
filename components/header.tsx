import Link from "next/link"
import { EduibLogo } from "./icons"
import { Button } from "@/components/ui/button"
import { MegaMenu } from "./mega-menu"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <EduibLogo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <MegaMenu />
            <Link href="/question-create" className="text-sm font-medium text-[#16AB8E] hover:text-[#138F78]">
              Create Question
            </Link>
            <Link href="/educators" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Educators
            </Link>
            <Link href="/students" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Students
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-sm font-medium text-[#16AB8E] hover:text-[#138F78]">
            Sign in
          </Link>
          <Button className="bg-[#16AB8E] hover:bg-[#138F78] text-white">Become a member</Button>
        </div>
      </div>
    </header>
  )
}
