export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-500 text-center py-4 border-t fixed bottom-0 left-0 right-0 z-40">
      <span>&copy; {new Date().getFullYear()} Alquran App. All rights reserved.</span>
    </footer>
  );
}
