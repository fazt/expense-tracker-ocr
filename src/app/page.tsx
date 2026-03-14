import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes scanPulse {
          0%   { top: 8%;  opacity: 0; }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.7; }
          100% { top: 88%; opacity: 0; }
        }
        .scan-beam {
          animation: scanPulse 2.8s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .float-card { animation: floatY 4s ease-in-out infinite; }

        @keyframes badgeIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .badge-1 { animation: badgeIn 0.5s ease forwards; animation-delay: 0.3s; opacity: 0; }
        .badge-2 { animation: badgeIn 0.5s ease forwards; animation-delay: 0.8s; opacity: 0; }
        .badge-3 { animation: badgeIn 0.5s ease forwards; animation-delay: 1.3s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">

        {/* ── NAV ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                $
              </div>
              <span className="font-semibold tracking-tight">ExpenseTracker</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg transition shadow-sm shadow-indigo-200 dark:shadow-indigo-950"
              >
                Empezar gratis
              </Link>
            </div>
          </div>
        </header>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Impulsado por GPT-4o Vision
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              Tus gastos,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                organizados con IA
              </span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
              Fotografía cualquier recibo y la IA extrae, categoriza y registra el gasto de forma automática. Controla tu presupuesto en tiempo real.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg shadow-indigo-200 dark:shadow-indigo-950/60"
              >
                Crear cuenta gratis
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition"
              >
                Iniciar sesión
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 pt-1">
              {[
                "Sin tarjeta de crédito",
                "Listo en 2 minutos",
                "Datos seguros",
              ].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — receipt mockup */}
          <div className="relative flex items-center justify-center h-[440px] select-none">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/25 dark:to-purple-950/25 rounded-3xl blur-3xl opacity-70" />

            {/* Receipt card */}
            <div className="float-card relative z-10 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
                <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest">Recibo escaneado</p>
                <p className="text-white font-semibold mt-0.5 text-sm">Supermercado Central</p>
              </div>

              <div className="px-5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Monto</span>
                  <span className="text-gray-900 dark:text-white font-bold">$47.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Fecha</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">13 Mar 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Categoría</span>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                    🛒 Alimentación
                  </span>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                  <p className="text-xs text-gray-400 mb-1.5">Texto extraído (OCR)</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 font-mono leading-relaxed">
                    Leche entera 2x $3.20<br />
                    Pan integral $2.80<br />
                    Yogur natural $4.50...
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl px-3 py-2.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse flex-shrink-0" />
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Procesado por IA</span>
                </div>
              </div>

              {/* Scan beam */}
              <div
                className="scan-beam absolute left-0 right-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, #818cf8, transparent)" }}
              />
            </div>

            {/* Badge: auto-categorized */}
            <div className="badge-1 absolute right-2 top-14 z-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-3 py-2.5 shadow-xl flex items-center gap-2.5">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center text-base">
                🏷️
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white leading-none">Auto-categorizado</p>
                <p className="text-xs text-gray-400 mt-0.5">en 1.2 segundos</p>
              </div>
            </div>

            {/* Badge: budget progress */}
            <div className="badge-2 absolute -left-2 bottom-28 z-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-3 py-2.5 shadow-xl min-w-44">
              <p className="text-xs text-gray-400 mb-2">Presupuesto · Alimentación</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-[58%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">58%</span>
              </div>
            </div>

            {/* Badge: saved */}
            <div className="badge-3 absolute right-4 bottom-20 z-20 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Gasto guardado
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────── */}
        <section className="bg-gray-50/80 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800/60 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl font-bold">Todo lo que necesitas</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                De escanear un ticket a cerrar el mes con tus cuentas claras, en una sola herramienta.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1.5">Escaneo OCR</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Fotografía cualquier recibo. GPT-4o Vision extrae monto, fecha y descripción al instante.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1.5">Auto-categorías</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Cada gasto se clasifica solo. Alimentación, Transporte, Salud y tus propias categorías.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1.5">Presupuestos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Define límites mensuales por categoría y recibe alertas antes de excederlos.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1.5">Exportar CSV</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Descarga tus gastos filtrados por mes, listos para tu declaración de impuestos.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────── */}
        <section className="py-24 max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-bold">Cómo funciona</h2>
            <p className="text-gray-500 dark:text-gray-400">Tres pasos y tus finanzas bajo control</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                emoji: "📷",
                title: "Escanea el recibo",
                desc: "Sube una foto o arrastra el archivo. Funciona con cualquier recibo, ticket o factura.",
                bg: "bg-indigo-50 dark:bg-indigo-950/40",
                accent: "text-indigo-600 dark:text-indigo-400",
                border: "border-indigo-100 dark:border-indigo-900/60",
              },
              {
                step: "02",
                emoji: "🤖",
                title: "La IA lo procesa",
                desc: "GPT-4o extrae el monto, fecha, descripción y categoría en menos de 2 segundos.",
                bg: "bg-purple-50 dark:bg-purple-950/40",
                accent: "text-purple-600 dark:text-purple-400",
                border: "border-purple-100 dark:border-purple-900/60",
              },
              {
                step: "03",
                emoji: "📊",
                title: "Controla tu dinero",
                desc: "Visualiza gráficas, monitorea presupuestos y exporta reportes cuando los necesites.",
                bg: "bg-violet-50 dark:bg-violet-950/40",
                accent: "text-violet-600 dark:text-violet-400",
                border: "border-violet-100 dark:border-violet-900/60",
              },
            ].map(({ step, emoji, title, desc, bg, accent, border }) => (
              <div
                key={step}
                className={`${bg} border ${border} rounded-2xl p-6 space-y-4 relative overflow-hidden`}
              >
                <div className="absolute top-4 right-4 text-4xl font-black opacity-[0.06] leading-none select-none">
                  {step}
                </div>
                <div className="text-3xl">{emoji}</div>
                <div>
                  <span className={`text-xs font-bold tracking-widest ${accent} uppercase`}>{step}</span>
                  <h3 className="font-bold mt-1 text-gray-900 dark:text-white">{title}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS STRIP ─────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-10">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
            {[
              { value: "GPT-4o", label: "Motor de visión IA" },
              { value: "< 2s", label: "Tiempo de procesamiento" },
              { value: "100%", label: "Datos en tu control" },
            ].map(({ value, label }) => (
              <div key={label} className="space-y-1">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-indigo-200 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Empieza a controlar<br />tus gastos hoy
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Gratis, sin tarjeta de crédito. Configúralo en menos de 2 minutos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg shadow-indigo-200 dark:shadow-indigo-950/60"
              >
                Crear cuenta gratis
              </Link>
              <Link
                href="/login"
                className="px-8 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition"
              >
                Ya tengo cuenta
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 justify-center text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Sin límite de recibos
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Categorías personalizadas
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Exportación CSV incluida
              </span>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="border-t border-gray-100 dark:border-gray-800/60 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                $
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">ExpenseTracker</span>
            </div>
            <p className="text-xs text-gray-400">
              Gestión de gastos con inteligencia artificial
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
