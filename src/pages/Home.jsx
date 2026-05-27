import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageTransition } from "../context/TransitionContext";
import img1 from "../assets/IMG_4266.JPEG";
import img2 from "../assets/IMG_4313.JPEG";
import img3 from "../assets/IMG_4272.JPG.jpeg";

const heroImg = [
  { src: img1, rotation: 0 },
  { src: img2, rotation: -30.39 },
  { src: img3, rotation: -14.12 },
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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1.2 })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from(quoteRef.current, { x: 30, opacity: 0, duration: 1 }, "-=0.5")
        .fromTo(
          imgRefs.current[0],
          { y: 50, opacity: 0, rotation: heroImg[0].rotation + 12 },
          {
            y: 0,
            opacity: 1,
            rotation: heroImg[0].rotation,
            duration: 1.4,
            ease: "expo.out",
          },
        )
        .fromTo(
          imgRefs.current[1],
          { y: 50, opacity: 0, rotation: heroImg[1].rotation + 12 },
          {
            y: 0,
            opacity: 1,
            rotation: heroImg[1].rotation,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=0.25",
        )
        .fromTo(
          imgRefs.current[2],
          { y: 50, opacity: 0, rotation: heroImg[2].rotation + 12 },
          {
            y: 0,
            opacity: 1,
            rotation: heroImg[2].rotation,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=0.25",
        );
    });

    return () => ctx.revert();
  }, [registerExit]);

  return (
    <main className="relative flex flex-col items-start justify-start min-h-screen px-6  pt-12">
      <h1
        ref={titleRef}
        className="font-semibold mb-4 flex flex-col justify-start leading-20"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "96px" }}
      >
        Realism <span>with an Impression.</span>
      </h1>
      <p
        ref={subtitleRef}
        className="text-gray-500"
        style={{
          fontFamily: "'Anonymous Pro', monospace",
          fontSize: "32px",
          fontWeight: 300,
        }}
      >
        A muse of passion and purpose
      </p>
      <div className="flex flex-row items-start  justify-between gap-8 mt-12 w-full">
        <div
          className="absolute"
          style={{
            left: "205.31px",
            top: "365.9px",
            width: "309px",
            height: "204px",
          }}
        >
          {heroImg.map(({ src }, index) => (
            <img
              key={index}
              ref={(el) => (imgRefs.current[index] = el)}
              src={src}
              alt={`Hero Image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              style={{ zIndex: index }}
            />
          ))}
        </div>
        <div
          ref={quoteRef}
          className="p-6 flex-1 max-w-lg absolute"
          style={{ left: "600px", top: "230px" }}
        >
          <span className="text-xs text-gray-500 mt-6 block  text-justify font-light">
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
