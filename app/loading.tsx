export default function Loading() {
  return (
    <div className="animate-pulse space-y-4" aria-busy="true">
      <div className="h-8 w-48 rounded bg-black/10" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-20 rounded bg-black/10" />
        <div className="h-20 rounded bg-black/10" />
        <div className="h-20 rounded bg-black/10" />
      </div>
      <div className="h-48 rounded bg-black/10" />
    </div>
  );
}
