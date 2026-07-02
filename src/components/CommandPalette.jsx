import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/App.css";

const CommandPalette = ({ open, onOpen, onClose }) => {
    const { toggleTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(0);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);
    const previousFocusRef = useRef(null);

    const commands = useMemo(() => [
        { label: "Go to About", run: () => document.getElementById("about")?.scrollIntoView() },
        { label: "Go to Experience", run: () => document.getElementById("experience")?.scrollIntoView() },
        { label: "Go to Leadership", run: () => document.getElementById("leadership")?.scrollIntoView() },
        { label: "Go to Projects", run: () => document.getElementById("projects")?.scrollIntoView() },
        { label: "Go to Skills", run: () => document.getElementById("skills")?.scrollIntoView() },
        { label: "Toggle theme", run: () => toggleTheme() },
        {
            label: "Copy email",
            keepOpen: true,
            run: () => {
                navigator.clipboard?.writeText("kairugakuo2@gmail.com").then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                });
            }
        },
        { label: "Open GitHub", run: () => window.open("https://github.com/kairugakuo2", "_blank", "noreferrer") },
        { label: "Open LinkedIn", run: () => window.open("https://www.linkedin.com/in/gakuo/", "_blank", "noreferrer") },
    ], [toggleTheme]);

    const filtered = useMemo(
        () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
        [commands, query]
    );

    // global open/close shortcut
    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                if (open) { onClose(); } else { onOpen(); }
            } else if (e.key === "Escape" && open) {
                onClose();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onOpen, onClose]);

    // open/close side effects: focus, scroll lock, state reset
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
        if (!command.keepOpen) onClose();
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
        <div className="palette-scrim" onClick={onClose}>
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
                                {command.label === "Copy email" && copied ? "copied ✓" : command.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommandPalette;
