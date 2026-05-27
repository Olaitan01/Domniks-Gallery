import { useEffect, useRef } from "react";
import gsap from "gsap";
import Domnik from "../assets/domnik.png";

export default function About() {
  const titleRef = useRef(null);

  useEffect(() => {
    // Reveal text upward from below — mirrors Home h1 pattern
    gsap.fromTo(
      titleRef.current,
      { yPercent: 0, opacity: 0 },
      {
        yPercent: 10,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.5,
      },
    );
  }, []);

  return (
    <main className="flex flex-col min-h-screen px-6 relative overflow-y-hidden ">
      {/* overflow-hidden clips the h1 during its upward reveal */}
      <div className="absolute bottom-30 left-10 overflow-hidden ">
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
      <div className="mt-20  text-gray-700 text-lg leading-relaxed absolute bottom-15 right-0">
        <img src={Domnik} alt="Domnik" className="max-w-fit w-3xs " />
      </div>
      <div className="w-full flex justify-end">
        <div className="flex flex-row gap-5 max-w-4xl  pt-10  mr-8">
          <div>
            <h2
              className=""
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 24px)",
              }}
            >
              From The Archivist
            </h2>
            <p className="mt-4 text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2  w-2xs text-justify">
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
              className=""
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 24px)",
              }}
            >
              The Arthive — Documentation Process
            </h2>
            <div className="flex flex-row gap-15 items-baseline">
              <div>
                <p className="mt-4 text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-2xs text-justify">
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
                  <ul className="list-disc list-inside text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-2xs">
                    <li>the feeling of a room,</li>
                    <li>the texture of a street,</li>
                    <li>the sound of evening radios,</li>
                    <li>the sound of footsteps,</li>
                    <li>clothing</li>
                  </ul>
                </div>
              </div>
              <div>
                <ul className="list-disc list-inside text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-2xs">
                  <li>Silence,</li>
                  <li>Gestures,</li>
                  <li>Architectures,</li>
                  <li>Routines,</li>
                  <li>Objects once considered ordinary</li>
                </ul>
                <p className="mt-2 text-gray-700 text-[0.7rem] leading-tight flex flex-col gap-2 w-2xs text-justify">
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
