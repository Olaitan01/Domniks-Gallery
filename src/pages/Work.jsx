import { useEffect, useRef, useState } from "react";
import { getArt } from "../lib/getArt";
import { urlFor } from "../lib/image";
import gsap from "gsap";

export default function Work() {
  const titleRef = useRef(null);
  const [arts, setArts] = useState([]);

  useEffect(() => {
    // GSAP animation
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

    // Fetch Sanity data
    getArt().then(setArts);
  }, []);

  return (
    <main className="flex flex-col min-h-screen px-6 relative overflow-y-hidden">
      <div className="absolute bottom-30 left-10 overflow-hidden">
        <h1
          ref={titleRef}
          className="font-semibold leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
          }}
        >
          Work.
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-12 gap-12">
        {arts.map((art) => (
          <div key={art._id} className=" flex flex-row items-center gap-4">
            <div>
              {art.featuredImage && (
                <img
                  src={urlFor(art.featuredImage).width(800).url()}
                  alt={art.title}
                  className="max-w-full w-120 h-auto object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2
                className="text-2xl font-semibold text-center w-60"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {art.title}
              </h2>
              <span
                className="text-center text-sm font-light text-gray-700  block w-60"
                style={{ fontFamily: "'Roboto Mono', Serif" }}
              >
                {art.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
