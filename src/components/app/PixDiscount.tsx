import { useState } from "react";
import { BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function PixDiscount() {
  const valor = 2579.2;
  const desconto = 10;
  const [aberto, setAberto] = useState(true);

  const final = valor * (1 - desconto / 100);
  const economia = valor - final;

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card/60 p-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-stone-brand">
          Pix recebido
        </p>
        <h2 className="mt-1 text-xl font-bold leading-tight">Desconto aplicado no pagamento</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Simule o desconto e confira o comprovante do valor efetivamente pago.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3" aria-label="Condições do pagamento">
        <div className="rounded-xl border border-border bg-background p-3.5">
          <span className="block text-xs font-medium uppercase text-muted-foreground">Valor original</span>
          <strong className="mt-1.5 block text-base">{brl(valor)}</strong>
        </div>
        <div className="rounded-xl border border-border bg-background p-3.5">
          <span className="block text-xs font-medium uppercase text-muted-foreground">Desconto aplicado</span>
          <strong className="mt-1.5 block text-base text-up">{desconto}%</strong>
        </div>
      </div>

      <dl className="space-y-3 rounded-2xl bg-background p-4">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Valor original</dt>
          <dd className="font-semibold line-through decoration-down/70">{brl(valor)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Economia ({desconto}%)</dt>
          <dd className="font-semibold text-up">- {brl(economia)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="font-semibold">Valor pago via Pix</dt>
          <dd className="text-lg font-bold text-stone-brand">{brl(final)}</dd>
        </div>
      </dl>

      <div className="flex items-start gap-3 rounded-2xl bg-up/10 p-4">
        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-up" />
        <p className="text-sm leading-relaxed">
          Pagamento confirmado de <strong>Elyse Martins de Biase</strong> para{" "}
          <strong>Pedro Henrique Levoni Vicenti</strong> — instituição destino STONE IP S.A.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
          className="press flex w-full items-center justify-center gap-2 rounded-full bg-elevated py-2.5 text-sm font-medium"
      >
        {aberto ? "Ocultar comprovante" : "Ver comprovante"}
        {aberto ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {aberto ? (
        <div className="rounded-xl border border-border bg-background p-4" aria-label="Comprovante Pix">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <BadgeCheck className="h-5 w-5 text-up" />
            <span className="font-semibold">Pix realizado com sucesso</span>
          </div>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Valor</dt>
              <dd className="font-bold text-stone-brand">{brl(final)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Recebedor</dt>
              <dd className="text-right font-semibold">Pedro Henrique Levoni Vicenti</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Instituição</dt>
              <dd className="text-right font-semibold">STONE IP S.A.</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
  );
}
