export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full text-center py-4 bg-rose-200 dark:bg-rose-300 shadow-md z-50">
      <p className="text-neutral-600 dark:text-neutral-500 text-sm">
        &copy; {new Date().getFullYear()} Onkar Bobde. All rights reserved.
      </p>
      <p className="text-xs text-neutral-500">
        Contact:{" "}
        <a
          href="mailto:bobdeonkar17@gmail.com"
          className="hover:underline text-rose-600 font-semibold"
        >
          bobdeonkar17@gmail.com
        </a>
      </p>
    </footer>
  );
}
