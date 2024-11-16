'use client'


import Navbar from "@/components/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Adjust pt-16 based on your navbar height */}
        {children}
      </main>
    </div>
  )
}
