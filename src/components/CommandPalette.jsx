import { useEffect, useMemo, useRef, useState } from "react";
import { toggleTheme } from "../lib/theme";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);

  const commands = useMemo(() => {
    const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return [
      { label: "Go to About", run: scrollTo("about") },
      { label: "Go to Experience", run: scrollTo("experience") },
      { label: "Go to Projects", run: scrollTo("projects") },
      { label: "Go to Skills", run: scrollTo("skills") },
      { label: "Go to Contact", run: scrollTo("contact") },
      { label: "Toggle theme", run: () => toggleTheme() },
      {
        label: "Copy email",
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText("kairugakuo2@gmail.com").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          });
        },
      },
      { label: "Open GitHub", run: () => window.open("https://github.com/kairugakuo2", "_blank", "noreferrer") },
      { label: "Open LinkedIn", run: () => window.open("https://www.linkedin.com/in/gakuo/", "_blank", "noreferrer") },
    ];
  }, []);

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [commands, query]
  );

  // Global open/close shortcut, plus the navbar's ⌘K button.
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onExternalOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("palette:open", onExternalOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("palette:open", onExternalOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setQuery("");
      setSelected(0);
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const runCommand = (command) => {
    command.run();
    if (!command.keepOpen) setOpen(false);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      runCommand(filtered[selected]);
    }
  };

  return (
    <div className="palette-scrim" onClick={() => setOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-input-row">
          <span className="palette-prompt">&gt;</span>
          <input
            ref={inputRef}
            className="palette-input"
            type="text"
            value={query}
            placeholder="type a command..."
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={onInputKeyDown}
          />
        </div>
        <ul className="palette-list">
          {filtered.length === 0 && (
            <li className="palette-empty">no matching commands</li>
          )}
          {filtered.map((command, i) => (
            <li key={command.label}>
              <button
                type="button"
                className={`palette-item${i === selected ? " palette-item-selected" : ""}`}
                onMouseEnter={() => setSelected(i)}
                onClick={() => runCommand(command)}
              >
                <span>
                  {command.label === "Copy email" && copied ? "copied ✓" : command.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
