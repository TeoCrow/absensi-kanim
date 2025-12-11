import NavHeader from "@/components/navbar.";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavHeader />
      <div className="bg-slate-50 h-screen">
        <div className="max-w-5xl mx-auto h-full p-3">
          <div className="flex w-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
