import { useState, type FormEvent } from "react";
import { Lock, User } from "lucide-react";

const VALID_USER = "liderança777";
const VALID_PASS = "Trampos77@";

/** Normaliza acentos/caixa para aceitar "lideranca777" digitado sem cedilha. */
function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);

    const ok = normalize(user) === normalize(VALID_USER) && pass === VALID_PASS;

    window.setTimeout(() => {
      setLoading(false);
      if (ok) {
        onSuccess();
      } else {
        setError(true);
      }
    }, 450);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-5 py-10 text-foreground">
      <div className="w-full max-w-[400px]">
        <div className="mb-10 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-2xl font-bold">
            ◈
          </span>
          <h1 className="text-2xl font-bold leading-tight tracking-tight">CRYPTO STONE IP SA</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acesso restrito à plataforma</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-foreground">Usuário</span>
            <span className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
              <User className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setError(false);
                }}
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Digite seu usuário"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-foreground">Senha</span>
            <span className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3">
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setError(false);
                }}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>

          <p
            role="alert"
            aria-live="polite"
            className={`text-sm text-down transition-opacity ${error ? "opacity-100" : "opacity-0"}`}
          >
            Usuário ou senha inválidos.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="press w-full rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © CRYPTO STONE IP SA · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
