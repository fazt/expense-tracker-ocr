import LoginForm from "../../../components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left branded panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-slate-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Receipt perforation edge — the signature element */}
        <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col items-center justify-around py-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          ))}
        </div>

        {/* Decorative scan line */}
        <div className="absolute top-0 left-0 right-6 h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-14">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2V8z" />
                <line x1="9" y1="11" x2="15" y2="11" />
                <line x1="9" y1="15" x2="13" y2="15" />
              </svg>
            </div>
            <span className="text-white font-semibold text-base tracking-tight">Expense Tracker</span>
          </div>

          <h2 className="text-[2.25rem] font-bold text-white leading-[1.15] tracking-tight mb-5">
            Cada gasto,<br />
            capturado al instante
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Escanea recibos con IA, categoriza automáticamente y mantén tus finanzas bajo control total.
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-3.5 pr-8">
          {[
            "OCR impulsado por inteligencia artificial",
            "Categorías detectadas automáticamente",
            "Historial y reportes en tiempo real",
          ].map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-400 text-sm leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white dark:bg-slate-900">
        <LoginForm />
      </div>
    </div>
  );
}
