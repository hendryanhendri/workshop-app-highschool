export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 text-gray-500 text-center py-2 border-t">
            <span>&copy; {new Date().getFullYear()} Alquran App. All rights reserved.</span>
            <span className="block mt-1">
                develop by <a href="https://hendrisudianto.my.id/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Hendri Sudianto</a>
            </span>
        </footer>
    );
}
