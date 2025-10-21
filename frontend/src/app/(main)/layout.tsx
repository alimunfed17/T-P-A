export default function WithHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
