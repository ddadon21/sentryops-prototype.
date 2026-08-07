import { useCallback, useEffect, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

// Vendor-prefixed shapes. Safari still ships only the webkit names, and older
// Edge the ms ones — without these the button silently does nothing there.
type FsElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

const fsDoc = () => document as FsDocument;
const currentElement = () => {
  const d = fsDoc();
  return d.fullscreenElement ?? d.webkitFullscreenElement ?? d.msFullscreenElement ?? null;
};

/**
 * App-wide full-screen toggle — a small corner control present on every route,
 * landing page included.
 *
 * Targets documentElement rather than a page-level wrapper so the whole app
 * fills the screen, and so pages that own a scroll container still scroll once
 * expanded. Pages with their own full-screen affordance (the org chart) keep
 * it; both drive the same underlying element and stay in sync through the
 * fullscreenchange event.
 */
export default function FullscreenToggle() {
  const [isFull, setIsFull] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const sync = () => setIsFull(!!currentElement());
    // Safari fires the webkit-prefixed event name only.
    const events = ['fullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'];
    events.forEach((e) => document.addEventListener(e, sync));
    sync();
    return () => events.forEach((e) => document.removeEventListener(e, sync));
  }, []);

  const toggle = useCallback(async () => {
    const d = fsDoc();
    try {
      if (currentElement()) {
        await (d.exitFullscreen?.() ?? d.webkitExitFullscreen?.() ?? d.msExitFullscreen?.());
      } else {
        const el = document.documentElement as FsElement;
        const request = el.requestFullscreen ?? el.webkitRequestFullscreen ?? el.msRequestFullscreen;
        if (!request) throw new Error('unsupported');
        await request.call(el);
      }
    } catch {
      // Denied — almost always an iframe embed without allow="fullscreen", or
      // a browser policy block. The button stays rendered either way: hiding it
      // would read as a missing feature rather than a blocked one.
      setBlocked(true);
      setTimeout(() => setBlocked(false), 4000);
    }
  }, []);

  const Icon = isFull ? Minimize2 : Maximize2;
  const label = isFull ? 'Exit full screen' : 'Full screen';

  return (
    <>
      {blocked && (
        <div className="fixed bottom-14 right-4 z-[70] px-3 py-2 rounded-lg border border-amber-500/50 bg-zinc-900/95 shadow-lg">
          <p className="text-[11px] text-amber-300">Full screen was blocked by the browser.</p>
        </div>
      )}
      <button
        onClick={toggle}
        title={`${label} (or press F11)`}
        aria-label={label}
        aria-pressed={isFull}
        className="fixed bottom-4 right-4 z-[70] w-8 h-8 flex items-center justify-center rounded-lg border
                   border-slate-300/70 dark:border-slate-700/70 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm
                   text-slate-500 dark:text-slate-400 opacity-40 hover:opacity-100
                   hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500
                   focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-amber-500/60
                   transition-all"
      >
        <Icon className="w-3.5 h-3.5" />
      </button>
    </>
  );
}
