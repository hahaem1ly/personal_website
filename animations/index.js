import gsap, { Power3 } from "gsap";

export const stagger = (target, fromvVars, toVars) => {
  return gsap.fromTo(
    target,
    { opacity: 0, ...fromvVars },
    { opacity: 1, ...toVars, stagger: 0.2, ease: Power3.easeOut }
  );
};

export const animateProfileImage = (element) => {
  if (!element) return;

  // Apply animation styles
  element.style.animation = "rollIn 2s ease-out";
};

// Add keyframes dynamically
if (typeof window !== "undefined") {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes rollIn {
      0% {
        opacity: 0;
        transform: translateX(-100%) rotate(-360deg);
      }
      100% {
        opacity: 1;
        transform: translateX(0) rotate(0deg);
      }
    }
  `, styleSheet.cssRules.length);
}
