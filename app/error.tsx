"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded border border-red-300 bg-red-50 p-6">
      <h2 className="text-lg font-bold text-red-800">Algo salió mal</h2>
      <p className="mt-2 text-sm text-red-700">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
