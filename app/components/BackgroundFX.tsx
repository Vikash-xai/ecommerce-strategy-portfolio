export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="bg-grid absolute inset-0 h-full w-full" />
    </div>
  );
}
