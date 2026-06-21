import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { NavItem } from '../layouts/DashboardLayout';

// Swipe-to-navigate, mobile/tablet only. Mirrors the iOS/Android "paging"
// feel: drag follows the finger 1:1, release either commits the page
// change (slide fully off-screen, then route) or snaps back. Direction is
// locked on the first ~10px of movement so vertical scrolling is never
// hijacked, and any touch that starts inside a horizontally-scrollable or
// interactive element (tables, selects, dropdowns, etc.) is ignored
// entirely so it can handle its own gesture.

const MOBILE_QUERY = '(max-width: 1023px)'; // matches the lg: sidebar breakpoint
const DISTANCE_THRESHOLD = 80; // px dragged to commit a page change
const FLICK_DISTANCE_MIN = 24; // px
const FLICK_VELOCITY_THRESHOLD = 0.5; // px/ms
const DIRECTION_LOCK_PX = 10; // px before direction is decided
const DIRECTION_LOCK_RATIO = 1.5; // |dx| must exceed |dy| * ratio to lock horizontal
const EDGE_RESISTANCE = 0.3; // rubber-band factor when there's no page in that direction
const ANIM_MS = 240;
const EASING = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

function flattenRoutes(navigation: NavItem[]): string[] {
  const routes: string[] = [];
  for (const item of navigation) {
    if (item.type === 'section') continue;
    if (item.hasSubmenu && item.submenu) {
      for (const sub of item.submenu) routes.push(sub.route);
    } else if (item.route) {
      routes.push(item.route);
    }
  }
  return routes;
}

function isInsideIgnoredZone(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest('[data-swipe-ignore], table, select, input, textarea, [role="listbox"], [role="menu"], [role="dialog"]')) {
    return true;
  }
  let el: Element | null = target;
  while (el) {
    if (el instanceof HTMLElement) {
      const style = window.getComputedStyle(el);
      const canScrollX = (style.overflowX === 'auto' || style.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 1;
      if (canScrollX) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function useSwipePageNav(navigation: NavItem[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Entrance animation: if we arrived here via a swipe (state.swipeDir set
  // by the gesture handler below), slide in from the matching edge.
  useEffect(() => {
    const el = containerRef.current;
    const swipeDir = (location.state as { swipeDir?: 'forward' | 'backward' } | null)?.swipeDir;
    if (!el || !isMobile || !swipeDir) return;
    const width = el.clientWidth || window.innerWidth;
    const startX = swipeDir === 'forward' ? width : -width;
    el.style.transition = 'none';
    el.style.transform = `translate3d(${startX}px, 0, 0)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        containerRef.current.style.transition = `transform ${ANIM_MS}ms ${EASING}`;
        containerRef.current.style.transform = 'translate3d(0, 0, 0)';
      });
    });
    // Mount-time only: this component instance is recreated fresh on every
    // route change, so there is exactly one entrance per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isMobile) return;

    let locked: 'horizontal' | 'vertical' | null = null;
    let ignoreGesture = false;
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let lastTranslate = 0;

    const routes = () => flattenRoutes(navigation);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      ignoreGesture = isInsideIgnoredZone(e.target);
      locked = null;
      lastTranslate = 0;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      el.style.transition = 'none';
    };

    const onTouchMove = (e: TouchEvent) => {
      if (ignoreGesture || e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - startX;
      const dy = y - startY;

      if (locked === null) {
        if (Math.abs(dx) < DIRECTION_LOCK_PX && Math.abs(dy) < DIRECTION_LOCK_PX) return;
        locked = Math.abs(dx) > Math.abs(dy) * DIRECTION_LOCK_RATIO ? 'horizontal' : 'vertical';
      }
      if (locked !== 'horizontal') return;

      const list = routes();
      const currentIndex = list.indexOf(location.pathname);
      const hasNext = currentIndex !== -1 && currentIndex < list.length - 1;
      const hasPrev = currentIndex > 0;
      const blocked = (dx < 0 && !hasNext) || (dx > 0 && !hasPrev);
      const translate = blocked ? dx * EDGE_RESISTANCE : dx;
      lastTranslate = translate;
      el.style.transform = `translate3d(${translate}px, 0, 0)`;
    };

    const settle = (toValue: number, after?: () => void) => {
      el.style.transition = `transform ${ANIM_MS}ms ${EASING}`;
      el.style.transform = `translate3d(${toValue}px, 0, 0)`;
      const cleanup = () => {
        el.removeEventListener('transitionend', cleanup);
        if (after) {
          after();
        } else {
          el.style.transition = 'none';
          el.style.transform = 'translate3d(0, 0, 0)';
        }
      };
      el.addEventListener('transitionend', cleanup);
    };

    const onTouchEnd = () => {
      if (locked !== 'horizontal') {
        locked = null;
        return;
      }
      locked = null;
      const elapsed = Math.max(1, Date.now() - startTime);
      const velocity = lastTranslate / elapsed;
      const list = routes();
      const currentIndex = list.indexOf(location.pathname);

      const distanceOk = Math.abs(lastTranslate) > DISTANCE_THRESHOLD;
      const flickOk = Math.abs(lastTranslate) > FLICK_DISTANCE_MIN && Math.abs(velocity) > FLICK_VELOCITY_THRESHOLD;
      const width = el.clientWidth || window.innerWidth;

      if (lastTranslate < 0 && currentIndex !== -1 && currentIndex < list.length - 1 && (distanceOk || flickOk)) {
        settle(-width, () => navigate(list[currentIndex + 1], { state: { swipeDir: 'forward' } }));
      } else if (lastTranslate > 0 && currentIndex > 0 && (distanceOk || flickOk)) {
        settle(width, () => navigate(list[currentIndex - 1], { state: { swipeDir: 'backward' } }));
      } else {
        settle(0);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isMobile, location.pathname, navigate, navigation]);

  return { containerRef, isMobile };
}
