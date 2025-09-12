'use client';

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Try again
    </button>
  );
}
