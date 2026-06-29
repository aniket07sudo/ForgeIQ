import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Dropdown.module.scss";
import { Button } from './Button'

type DropdownItem = {
  label: React.ReactNode;
  value?: string;
  onSelect?: () => void;
  disabled?: boolean;
};

type RenderTriggerArgs = {
  ref: (el: HTMLElement | null) => void;
  open: boolean;
  toggle: () => void;
  ariaProps: Record<string, any>;
  selected?: string | undefined;
  setSelected?: (v?: string) => void;
};

type Props = {
  trigger?: React.ReactNode;
  renderTrigger?: (args: RenderTriggerArgs) => React.ReactNode;
  children?: React.ReactNode;
  items?: DropdownItem[];
  align?: "left" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value?: string) => void;
  className?: string;
};

export function Dropdown({
  trigger,
  renderTrigger,
  children,
  items,
  align = "left",
  open: controlledOpen,
  onOpenChange,
  onSelect,
  className,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const isControlled = controlledOpen !== undefined;
  const actualOpen = isControlled ? !!controlledOpen : open;

  const triggerRef = useRef<HTMLElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
  const portalNodeRef = useRef<HTMLDivElement | null>(
    typeof document !== "undefined" ? document.createElement("div") : null,
  );
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const focusedIndexRef = useRef<number>(-1);

  // append portal node once
  useEffect(() => {
    const node = portalNodeRef.current;
    if (!node) return;
    document.body.appendChild(node);
    return () => {
      if (node.parentNode) node.parentNode.removeChild(node);
    };
  }, []);

  // outside click and ESC close
  useEffect(() => {
    function onDocClick(e: Event) {
      const t = e.target as Node;
      const node = portalNodeRef.current;
      const trig = triggerRef.current;
      if (!node || !trig) return;
      if (node.contains(t) || trig.contains(t)) return;
      closeMenu();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
      }
    }
    // use click/touchend so trigger's own handlers (focus/click) run first
    document.addEventListener("click", onDocClick);
    document.addEventListener("touchend", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("touchend", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isControlled, onOpenChange]);

  // position on open
  const position = useCallback(() => {
    const node = portalNodeRef.current;
    const trig = triggerRef.current;
    const content = contentRef.current;
    if (!node || !trig || !content) return;
    const trigRect = trig.getBoundingClientRect();
    const width = content.offsetWidth;
    const height = content.offsetHeight;
    let left = align === "left" ? trigRect.left : trigRect.right - width;
    let top = trigRect.bottom + 8;
    // horizontal clamp
    if (left + width > window.innerWidth - 8)
      left = window.innerWidth - width - 8;
    if (left < 8) left = 8;
    // if overflow bottom, flip above
    if (top + height > window.innerHeight - 8) top = trigRect.top - height - 8;
    if (top < 8) top = 8;
    content.style.left = `${Math.round(left)}px`;
    content.style.top = `${Math.round(top)}px`;
  }, [align]);

  useEffect(() => {
    if (!actualOpen) return;
    // wait for portal render
    requestAnimationFrame(() => {
      position();
      // gather focusable items
      const content = contentRef.current;
      if (!content) return;
      const nodeList = Array.from(
        content.querySelectorAll<HTMLElement>(
          `button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`,
        ),
      );
      itemsRef.current = nodeList.filter((n) => !n.hasAttribute("disabled"));
      // ensure menu items have role
      itemsRef.current.forEach((it) => {
        if (!it.getAttribute("role")) it.setAttribute("role", "menuitem");
      });
      focusedIndexRef.current = -1;
      // focus first item
      if (itemsRef.current.length) {
        focusedIndexRef.current = 0;
        itemsRef.current[0].focus();
      }
    });
  }, [actualOpen, position]);

  // keyboard navigation inside menu
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    function onKey(e: KeyboardEvent) {
      const items = itemsRef.current;
      if (!items || !items.length) return;
      const idx = focusedIndexRef.current;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (idx + 1) % items.length;
        focusedIndexRef.current = next;
        items[next].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (idx - 1 + items.length) % items.length;
        focusedIndexRef.current = prev;
        items[prev].focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        focusedIndexRef.current = 0;
        items[0].focus();
      } else if (e.key === "End") {
        e.preventDefault();
        focusedIndexRef.current = items.length - 1;
        items[items.length - 1].focus();
      } else if (e.key === "Enter" || e.key === " ") {
        // trigger click on focused element
        if (idx >= 0 && items[idx]) {
          items[idx].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
      }
    }
    content.addEventListener("keydown", onKey);
    return () => content.removeEventListener("keydown", onKey);
  }, [actualOpen]);

  function toggle() {
    if (isControlled) onOpenChange?.(!controlledOpen);
    else setOpen((v) => !v);
  }

  function closeMenu() {
    if (isControlled) onOpenChange?.(false);
    else setOpen(false);
    try {
      triggerRef.current?.blur();
    } catch (e) {
      // 
    }
  }

  const setTriggerRef = (el: HTMLElement | null) => {
    triggerRef.current = el;
  };

  const triggerEl = renderTrigger ? (
    renderTrigger({
      ref: setTriggerRef,
      open: actualOpen,
      toggle,
      ariaProps: { "aria-haspopup": "menu", "aria-expanded": actualOpen },
      selected: selectedValue,
      setSelected: setSelectedValue,
    })
  ) : (
    <Button
      ref={(el) => { setTriggerRef(el as any) }}
      aria-haspopup="menu"
      aria-expanded={actualOpen}
      onClick={toggle}
      variant="ghost"
      size="sm"
    >
      {trigger}
    </Button>
  );

  const node = portalNodeRef.current;
  return (
    <>
      <span className={styles.root + (className ? " " + className : "")}>
        {triggerEl}
      </span>
          {node &&
        actualOpen &&
        ReactDOM.createPortal(
          <div ref={contentRef} className={styles.portal} role="menu">
            <div className={styles.arrow} aria-hidden />
            <div className={styles.list} tabIndex={-1}>
              {items && items.length
                ? items.map((it, idx) => (
                    <Button
                      key={idx}
                      role="menuitem"
                      disabled={it.disabled}
                      className={styles.item}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        try {
                          // update internal selected value for trigger
                          setSelectedValue(it.value)
                          if (it.onSelect) it.onSelect();
                          else if (typeof onSelect === "function") onSelect(it.value);
                        } finally {
                          closeMenu();
                        }
                      }}
                    >
                      {it.label}
                    </Button>
                  ))
                : children}
            </div>
          </div>,
          node,
        )}
    </>
  );
}

export default Dropdown;
