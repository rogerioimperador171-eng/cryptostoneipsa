import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const HISTORY_KEY = "stone-pix-key-history";
const INITIAL_PIX_KEY = "8f1d07c2-6e49-4a35-9b82-71c0e6d4fa93";

function makeRandomPixKey() {
  return crypto.randomUUID();
}

export function CodeGenerator() {
  const [pixKey, setPixKey] = useState(INITIAL_PIX_KEY);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved) as string[]);
    } catch {
      /* sessão indisponível */
    }
  }, []);

  const generate = () => {
    const next = makeRandomPixKey();
    setPixKey(next);
    setCopied(false);
    setHistory((h) => {
      const list = [next, ...h].slice(0, 8);
      try {
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(list));
      } catch {
        /* sessão indisponível */
      }
      return list;
    });
  };


  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast.success("Chave Pix copiada");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Não foi possível copiar a chave Pix");
    }
  };

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card/60 p-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-stone-brand">
          Gerador de chave Pix
        </p>
        <h2 className="mt-1 text-xl font-bold leading-tight">Chave Pix aleatória</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gere uma chave fictícia e exclusiva para identificar cada coleta.
        </p>
      </div>

      <div className="rounded-xl border border-border/70 bg-background px-4 py-5 text-center shadow-inner">
        <p className="break-all font-mono text-[15px] font-semibold leading-relaxed text-foreground sm:text-lg">
          {pixKey}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        <button
          type="button"
          onClick={generate}
          className="press flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <RefreshCw className="h-5 w-5" /> Gerar chave Pix
        </button>
        <button
          type="button"
          onClick={copy}
          aria-label="Copiar chave Pix"
          className="press flex h-11 w-11 items-center justify-center rounded-full bg-elevated"
        >
          {copied ? <Check className="h-5 w-5 text-up" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>

      {history.length > 0 ? (
        <ul className="space-y-2 border-t border-border pt-4">
          {history.map((h) => (
            <li key={h} className="font-mono text-sm text-muted-foreground">
              {h}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
