export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5">
      {children}
    </div>
  );
}
