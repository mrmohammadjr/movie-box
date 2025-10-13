'use client';

import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const animatePageIn = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve();
      return;
    }

    const banners = [
      document.getElementById("banner-1"),
      document.getElementById("banner-2"),
      document.getElementById("banner-3"),
      document.getElementById("banner-4")
    ];

    if (banners.every(banner => banner !== null)) {
      const tl = gsap.timeline({
        onComplete: () => resolve()
      });

      tl.set(banners, {
        yPercent: 0,
      }).to(banners, {
        yPercent: 100,
        stagger: 0.3,
      });
    } else {
      resolve();
    }
  });
}

export const animatePageOut = (href: string, router: AppRouterInstance): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      router.push(href);
      resolve();
      return;
    }

    const banners = [
      document.getElementById("banner-1"),
      document.getElementById("banner-2"),
      document.getElementById("banner-3"),
      document.getElementById("banner-4")
    ];

    if (banners.every(banner => banner !== null)) {
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
          resolve();
        }
      });

      tl.set(banners, {
        yPercent: -100,
      }).to(banners, {
        yPercent: 0,
        stagger: 0.3,
      });
    } else {
      router.push(href);
      resolve();
    }
  });
}