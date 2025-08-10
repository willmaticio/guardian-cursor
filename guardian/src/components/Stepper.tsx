import React from "react";

type Step = { key: string; label: string; done?: boolean; note?: string };

type DualStepperProps = {
  ai: Step[];
  human: Step[];
};

export function DualStepper({ ai, human }: DualStepperProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card">
        <div className="card-header"><div className="font-semibold">AI Automation</div></div>
        <div className="card-body">
          <ol className="space-y-2">
            {ai.map((s, i) => (
              <li key={s.key} className="flex items-start gap-2">
                <div className={`h-6 w-6 grid place-items-center rounded-full text-xs font-bold ${s.done ? "bg-emerald-500 text-black" : "bg-white/10"}`}>{i + 1}</div>
                <div>
                  <div className="font-medium">{s.label}</div>
                  {s.note && <div className="text-xs text-white/70">{s.note}</div>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="font-semibold">Human Review</div></div>
        <div className="card-body">
          <ol className="space-y-2">
            {human.map((s, i) => (
              <li key={s.key} className="flex items-start gap-2">
                <div className={`h-6 w-6 grid place-items-center rounded-full text-xs font-bold ${s.done ? "bg-emerald-500 text-black" : "bg-white/10"}`}>{i + 1}</div>
                <div>
                  <div className="font-medium">{s.label}</div>
                  {s.note && <div className="text-xs text-white/70">{s.note}</div>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}