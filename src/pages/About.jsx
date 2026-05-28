import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Domnik from "../assets/domnik.png";
import { usePageTransition } from "../context/TransitionContext";

export default function About() {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const { registerExit, captureSharedImage, peekSharedImage, clearSharedImage } =
    usePageTransition();

  // Apply FLIP offset before first paint so there's no visible flash
  useLayoutEffect(() => {
    const data = peekSharedImage();
    if (data && imageRef.current) {
      const dest = imageRef.current.getBoundingClientRect();
      gsap.set(imageRef.current, {
        // x: data.rect.left - dest.left,
        // y: data.rect.top - dest.top,
        scaleX: data.rect.width / dest.width,
        scaleY: data.rect.height / dest.height,
        transformOrigin: "top left",
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    registerExit(
      (targetPath) =>
        new Promise((resolve) => {
          if (targetPath === "/contact") {
            captureSharedImage(imageRef.current);
          } else {
            clearSharedImage();
          }
          const tl = gsap.timeline({ onComplete: resolve });
          tl.to(imageRef.current, { opacity: 0, duration: 0.30, ease: "power2.in" }, 0).to(
            titleRef.current,
            { y: -20, opacity: 0, duration: 0.45, ease: "power2.in" },
            0,
          );
        }),
    );

    const data = peekSharedImage();
    if (data && imageRef.current) {
      clearSharedImage();
      gsap.to(imageRef.current, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.85, ease: "expo.out" });
      gsap.fromTo(
        titleRef.current,
        { yPercent: 0, opacity: 0 },
        { yPercent: 10, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.2 },
      );
    } else {
      gsap.fromTo(
        titleRef.current,
        { yPercent: 0, opacity: 0 },
        { yPercent: 10, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.5 },
      );
    }

    const title = titleRef.current;
    const image = imageRef.current;
    return () => gsap.killTweensOf([title, image]);
  }, [registerExit, captureSharedImage, peekSharedImage, clearSharedImage]);

  return (
    <main className="flex flex-col min-h-screen px-4 md:px-6 relative overflow-x-hidden md:overflow-y-hidden">
      {/* Title: flows on mobile at top, absolute on desktop at bottom-left */}
      <div className="overflow-hidden pt-6 md:pt-0 md:absolute md:bottom-30 md:left-10">
        <h1
          ref={titleRef}
          className="font-semibold leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
          }}
        >
          About.
        </h1>
      </div>

      {/* Image: flows on mobile, absolute on desktop */}
      <div className="flex justify-center md:block mt-4 md:mt-0 md:absolute md:bottom-15 md:right-0">
        <img
          ref={imageRef}
          src={Domnik}
          alt="Domnik"
          className="w-60 md:max-w-fit md:w-3xs"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="w-full flex justify-start md:justify-end mt-4 md:mt-0">
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 w-full max-w-4xl pt-4 md:pt-10">
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 2.5vw, 32px)",
              }}
            >
              From The Archivist
            </h2>
            <p className="mt-4 text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-full md:w-2xs text-justify">
              <span>
                Certain memories elude us in our daily struggle to survive. They
                fade- not because they are unimportant, but because we fail to
                anchor them in our lives.
              </span>{" "}
              <span>
                With every passing moment, new memories are made. Yet without
                something to hold them in place- no memento, no form- they slip
                quietly into the recesses of the mind, waiting... for something,
                or someone to bring them back.
              </span>{" "}
              <span>
                The arthive is that something. It exists to build mementos for
                lived experience- to give form to memory, and permanence to
                moments that would otherwise be lost
              </span>
            </p>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 2.5vw, 32px)",
              }}
            >
              The Arthive — Documentation Process
            </h2>
            <div className="flex flex-col sm:flex-row gap-0 md:gap-15 items-start md:items-baseline">
              <div>
                <p className="mt-4 text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-full md:w-2xs text-justify">
                  <span>The Arthive begins with memory.</span>{" "}
                  <span>
                    Not history as recorded by institutions, but history as
                    carried by people— through recollection, emotion, fragments,
                    routines, objects, and atmosphere.
                  </span>{" "}
                  <span>
                    Each work begins with a Memory Session: a conversation
                    centered around lived experience. Participants are invited
                    to revisit moments from their personal histories—childhood
                    scenes, environments, encounters, celebrations, losses,
                    habits, sounds, or ordinary details that time has gradually
                    obscured.
                  </span>
                  <span>
                    These sessions are not approached as interviews alone,
                  </span>
                  <span>but as acts of recall.</span>
                  <span>
                    Particular attention is given not only to events themselves,
                  </span>
                  <span>
                    but to the sensory and emotional traces surrounding them:
                  </span>
                </p>
                <div>
                  <ul className="list-disc list-inside text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-full md:w-2xs">
                    <li>the feeling of a room,</li>
                    <li>the texture of a street,</li>
                    <li>the sound of evening radios,</li>
                    <li>the sound of footsteps,</li>
                    <li>clothing</li>
                  </ul>
                </div>
              </div>
              <div>
                <ul className="list-disc list-inside text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-full md:w-2xs">
                  <li>Silence,</li>
                  <li>Gestures,</li>
                  <li>Architectures,</li>
                  <li>Routines,</li>
                  <li>Objects once considered ordinary</li>
                </ul>
                <p className="mt-2 text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-full md:w-3xs text-justify">
                  From this conversation a visual archive is constructed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
