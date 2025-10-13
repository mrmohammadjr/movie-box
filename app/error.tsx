"use client"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-gray-300 max-w-xl break-words">{error?.message ?? "Unexpected error"}</p>
      {error?.digest && (
        <p className="text-xs text-gray-500">Reference: {error.digest}</p>
      )}
      <button
        onClick={() => reset()}
        className="bg-amber-500 text-black px-4 py-2 rounded hover:opacity-90"
      >
        Try again
      </button>
    </div>
  )
}