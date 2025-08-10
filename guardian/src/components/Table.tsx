"use client";

import React, { useMemo, useState } from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sort?: (a: T, b: T) => number;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  filterPlaceholder?: string;
  rowKey: (row: T, idx: number) => string;
};

export function Table<T>({ columns, data, filterPlaceholder = "Filter…", rowKey }: TableProps<T>) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    if (!q) return data;
    const lc = q.toLowerCase();
    return data.filter((row) => JSON.stringify(row).toLowerCase().includes(lc));
  }, [q, data]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    const copy = [...filtered];
    copy.sort((a, b) => {
      if (col?.sort) return col.sort(a, b) * (sortDir === "asc" ? 1 : -1);
      const aRec = a as unknown as Record<string, unknown>;
      const bRec = b as unknown as Record<string, unknown>;
      const va = aRec[sortKey];
      const vb = bRec[sortKey];
      if (va == null) return -1 * (sortDir === "asc" ? 1 : -1);
      if (vb == null) return 1 * (sortDir === "asc" ? 1 : -1);
      return String(va).localeCompare(String(vb)) * (sortDir === "asc" ? 1 : -1);
    });
    return copy;
  }, [filtered, sortKey, sortDir, columns]);

  function onHeaderClick(key: string) {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function renderCell(row: T, key: string): React.ReactNode {
    const rec = row as unknown as Record<string, unknown>;
    const value = rec[key];
    if (value == null) return "";
    return value as React.ReactNode;
  }

  return (
    <div className="w-full">
      <div className="mb-2">
        <input className="input w-full" placeholder={filterPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} onClick={() => onHeaderClick(String(c.key))} className="cursor-pointer select-none">
                  {c.header}
                  {sortKey === c.key && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => (
              <tr key={rowKey(row, idx)}>
                {columns.map((c) => (
                  <td key={String(c.key)}>{c.render ? c.render(row) : renderCell(row, String(c.key))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}