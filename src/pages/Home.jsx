import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageTransition } from "../context/TransitionContext";
import img1 from "../assets/IMG_4266.JPEG";
import img2 from "../assets/IMG_4313.JPEG";
import img3 from "../assets/IMG_4272.JPG.jpeg";

const heroImg = [
  { src: img1, rotation: 0,      mobileRotation: 0   },
  { src: img2, rotation: -30.39, mobileRotation: -10 },
  { src: img3, rotation: -14.12, mobileRotation: -5  },
];

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRefs = useRef([]);
  const quoteRef = useRef(null);
  const { registerExit } = usePageTransition();

  useEffect(() => {
    registerExit(
      () =>
        new Promise((resolve) => {
          const tl = gsap.timeline({ onComplete: resolve });
          tl.to(titleRef.current, { y: 50, opacity: 0, duration: 0.6, ease: "power2.in" })
            .to(subtitleRef.current, { y: 25, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.35");
        })
    );

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1.2 })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from(quoteRef.current, { x: 30, opacity: 0, duration: 1 }, "-=0.5")
        .fromTo(
          imgRefs.current[0],
          { y: 50, opacity: 0, rotation: (isMobile ? heroImg[0].mobileRotation : heroImg[0].rotation) + 6 },
          {
            y: 0,
            opacity: 1,
            rotation: isMobile ? heroImg[0].mobileRotation : heroImg[0].rotation,
            duration: 1,
            ease: "expo.out",
          },
        )
        .fromTo(
          imgRefs.current[1],
          { y: 50, opacity: 0, rotation: (isMobile ? heroImg[1].mobileRotation : heroImg[1].rotation) + 6 },
          {
            y: 0,
            opacity: 1,
            rotation: isMobile ? heroImg[1].mobileRotation : heroImg[1].rotation,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.25",
        )
        .fromTo(
          imgRefs.current[2],
          { y: 50, opacity: 0, rotation: (isMobile ? heroImg[2].mobileRotation : heroImg[2].rotation) + 6 },
          {
            y: 0,
            opacity: 1,
            rotation: isMobile ? heroImg[2].mobileRotation : heroImg[2].rotation,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.25",
        );
    });

    return () => ctx.revert();
  }, [registerExit]);

  return (
    <main className="relative flex flex-col items-start justify-start min-h-screen px-4 md:px-6 pt-8 md:pt-12">
      <h1
        ref={titleRef}
        className="font-semibold mb-3 md:mb-4 flex flex-col justify-start leading-tight md:leading-20"
        style={{ fontFamily: "’Playfair Display’, serif", fontSize: "clamp(40px, 9vw, 96px)" }}
      >
        Realism <span>with an Impression.</span>
      </h1>
      <p
        ref={subtitleRef}
        className="text-gray-500 mb-4 md:mb-0 text-justify font-light w-full max-w-lg"
        style={{
          fontFamily: "’Anonymous Pro’, monospace",
          fontSize: "clamp(16px, 4vw, 32px)",
          fontWeight: 300,
        }}
      >
        A muse of passion and purpose
      </p>

      {/* Image stack + quote: flow on mobile, absolute on desktop */}
      <div className="flex flex-col items-center gap-6 mt-9 w-full md:block md:mt-0">
        <div
          className="relative w-77.25 h-51 -top-2.5 left-8 md:absolute md:left-51.25 md:top-81.5"
        >
          {heroImg.map(({ src }, index) => (
            <img
              key={index}
              ref={(el) => (imgRefs.current[index] = el)}
              src={src}
              alt={`Hero Image ${index + 1}`}
              className="absolute inset-0 md:w-full w-60 h-full object-cover rounded-lg shadow-lg "
              style={{ zIndex: index }}
            />
          ))}
        </div>
        <div
          ref={quoteRef}
          className="px-4 max-w-sm w-full md:p-6 md:absolute md:left-150 md:top-57.5 md:max-w-lg md:px-0"
        >
          <span className="text-xs text-gray-500 block text-justify font-light">
            I admired the world so much that when that when I could tour it, I
            brought it home on every piece, a part of the world is fully lived -
            it’s beauty, its colours, and its cultures. I may have only seen
            pictures of may places beyond, but every brushstroke build a
            nostalgia for places i had never bee. - Ezeonu, Chinedum Martin
          </span>
        </div>
      </div>
    </main>
  );
}
