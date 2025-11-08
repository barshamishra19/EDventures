export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-8">
      <div className="container-page py-6 text-sm text-slate-400 flex flex-col sm:flex-row justify-between">
        <span>© {new Date().getFullYear()} EDventure — Hackathon Build</span>
        <span>Built by DEVETA ⚡ Aryan, Taniya, Adrika & Barsha</span>
      </div>
    </footer>
  );
}
