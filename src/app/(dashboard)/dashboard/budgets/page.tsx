"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  category: Category;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const now = new Date();
  const [month] = useState(now.getMonth() + 1);
  const [year] = useState(now.getFullYear());
  const [form, setForm] = useState({ amount: "", categoryId: "" });
  const [stats, setStats] = useState<Record<string, number>>({});

  function loadData() {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
    fetch(`/api/budgets?month=${month}&year=${year}`).then((r) => r.json()).then(setBudgets);
    fetch(`/api/expenses/stats?month=${month}&year=${year}`)
      .then((r) => r.json())
      .then((s) => {
        const map: Record<string, number> = {};
        s.byCategory?.forEach((c: { name: string; total: number }) => { map[c.name] = c.total; });
        setStats(map);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadData(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, month, year }),
    });
    setForm({ amount: "", categoryId: "" });
    loadData();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Presupuestos - {month}/{year}</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-sm font-medium block mb-1">Categoria</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:text-gray-100"
            required
          >
            <option value="">Seleccionar</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Limite</label>
          <input
            type="number"
            step="0.01"
            placeholder="Monto"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
          Guardar
        </button>
      </form>

      <div className="space-y-3">
        {budgets.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 text-gray-400 text-sm">
            No hay presupuestos configurados
          </div>
        ) : (
          budgets.map((b) => {
            const spent = stats[b.category.name] || 0;
            const pct = Math.min((spent / b.amount) * 100, 100);
            const over = spent > b.amount;
            return (
              <div key={b.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.category.color }} />
                    <span className="font-medium">{b.category.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${over ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-300"}`}>
                    ${spent.toFixed(2)} / ${b.amount.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${over ? "bg-red-500" : pct >= 80 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round(pct)}% usado</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
