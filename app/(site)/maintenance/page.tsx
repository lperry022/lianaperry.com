'use client';

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col
                    bg-white text-neutral-900
                    dark:bg-black dark:text-white
                    transition-colors">
      {/* Give space if you use a floating dock navbar */}
      <main className="flex-1 flex items-center justify-center px-6 pt-28">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold
                         text-purple-700 dark:text-purple-300">
            🚧 Under Maintenance
          </h1>
          <p className="text-lg text-neutral-700 dark:text-zinc-300">
            This page is being updated. Please check back soon.
          </p>
        </div>
      </main>
    </div>
  );
}
