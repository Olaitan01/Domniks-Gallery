import { useEffect, useRef, useState } from "react";
import { getArt } from "../lib/getArt";
import { urlFor } from "../lib/image";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(Observer);

export default function Work() {
  const titleRef = useRef(null);
  const [arts, setArts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
  const panelRefs = useRef([]);
  const curIdx = useRef(0);
  const animating = useRef(false);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { yPercent: 0, opacity: 0 },
      {
        yPercent: 10,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.8,
      },
    );
    getArt().then(setArts);
  }, []);

  useEffect(() => {
    if (arts.length === 0 || !galleryRef.current) return;

    const panels = panelRefs.current.filter(Boolean);
    const total = panels.length;
    if (total === 0) return;

    // All panels hidden and slightly zoomed-in except the first
    gsap.set(panels, { autoAlpha: 0, scale: 1.04 });
    gsap.set(panels[0], { autoAlpha: 1, scale: 1 });
    panels.forEach((p, i) => gsap.set(p, { zIndex: i === 0 ? 10 : 1 }));

    function wrap(i) {
      return ((i % total) + total) % total;
    }

    function goTo(next, direction) {
      if (animating.current) return;
      const from = curIdx.current;
      const to = wrap(next);

      animating.current = true;
      const out = panels[from];
      const inn = panels[to];

      // Promote incoming above outgoing during the cross-fade
      gsap.set(out, { zIndex: 5 });
      gsap.set(inn, {
        zIndex: 10,
        // Incoming starts slightly zoomed-in (down) or zoomed-out (up)
        scale: direction > 0 ? 1.04 : 0.97,
        autoAlpha: 0,
      });

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(out, { zIndex: 1 });
            curIdx.current = to;
            setActiveIndex(to);
            animating.current = false;
          },
        })
        .to(
          out,
          {
            scale: direction > 0 ? 0.96 : 1.03,
            autoAlpha: 0,
            duration: 0.72,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          inn,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.72,
            ease: "power2.out",
          },
          0,
        );
    }

    const obs = Observer.create({
      target: galleryRef.current,
      type: isMobile ? "touch,pointer" : "wheel,touch,pointer",

      ...(isMobile
        ? {
            onLeft: () => goTo(curIdx.current + 1, 1),

            onRight: () => goTo(curIdx.current - 1, -1),
          }
        : {
            onDown: () => goTo(curIdx.current + 1, 1),

            onUp: () => goTo(curIdx.current - 1, -1),
          }),

      tolerance: 12,
      lockAxis: true,
      preventDefault: !isMobile,
    });

    function handleKey(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        goTo(curIdx.current + 1, 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        goTo(curIdx.current - 1, -1);
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      obs.kill();
      window.removeEventListener("keydown", handleKey);
      gsap.killTweensOf(panels);
    };
  }, [arts, isMobile]);

  return (
    <main className="flex flex-col relative">
      {/* ── Infinite gallery ── */}
      <section
        ref={galleryRef}
        className="relative h-screen overflow-x-hidden bg-[#EDE9E6]"
        style={{ touchAction: "none" }}
      >
        {arts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-xs tracking-[0.3em] text-gray-400 uppercase"
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
              Loading…
            </span>
          </div>
        )}

        {[
          ...arts,
          {
            _id: "contact-card",
            isContactCard: true,
          },
        ].map((art, index) => (
          <div
            key={art._id}
            ref={(el) => {
              if (el) panelRefs.current[index] = el;
            }}
            className={`absolute inset-0  ${
              arts.length === 0 ? "opacity-0" : "opacity-100"
            }`}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* CONTACT CARD */}
              {art.isContactCard ? (
                <>
                  {/* Left */}
                  <div className="w-full h-1/2 md:w-[58%] md:h-full shrink-0 bg-black flex items-center justify-center overflow-hidden">
                    <div className="text-center px-6 md:px-10">
                      <h2
                        className="text-white font-semibold leading-tight"
                        style={{
                          fontFamily: "’Playfair Display’, serif",
                          fontSize: "clamp(32px, 5vw, 90px)",
                        }}
                      >
                        Let’s Work Together
                      </h2>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="w-full md:w-[42%] shrink-0 px-6 py-8 md:px-14 md:py-16 flex flex-col md:gap-28 gap-0 bg-[#EDE9E6] overflow-y-auto md:overflow-y-visible">
                    <div className="flex flex-col gap-4 md:gap-6">
                      <span
                        className="text-xs tracking-[0.28em] text-gray-400 uppercase"
                        style={{
                          fontFamily: "’Roboto Mono’, monospace",
                        }}
                      >
                        CONTACT
                      </span>

                      <h2
                        className="font-semibold leading-tight"
                        style={{
                          fontFamily: "’Playfair Display’, serif",
                          fontSize: "clamp(22px, 3.2vw, 52px)",
                        }}
                      >
                        Interested in a piece?
                      </h2>

                      <div className="w-8 h-px bg-black" />

                      <p
                        className="text-[0.7rem] text-gray-600 leading-relaxed text-justify max-w-xs"
                        style={{
                          fontFamily: "’Roboto Mono’, monospace",
                        }}
                      >
                        Contact me if you find any work you like or would like
                        to collaborate on a future project.
                      </p>
                    </div>

                    <NavLink
                      href="./Contact"
                      className="w-fit mt-6 md:mt-0 border border-black px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-black hover:text-white"
                      style={{
                        fontFamily: "’Roboto Mono’, monospace",
                      }}
                    >
                      Contact Me
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  {/* Left — image */}
                  <div className="w-full h-1/2 md:w-[58%] md:h-full shrink-0 overflow-hidden">
                    {art.featuredImage ? (
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={[400, 800, 1200, 1600]
                            .map(
                              (w) =>
                                `${urlFor(art.featuredImage).width(w).format("webp").url()} ${w}w`,
                            )
                            .join(", ")}
                          sizes="(max-width: 768px) 90vw, 58vw"
                        />
                        <img
                          src={urlFor(art.featuredImage)
                            .width(800)
                            .format("jpg")
                            .url()}
                          srcSet={[400, 800, 1200, 1600]
                            .map(
                              (w) =>
                                `${urlFor(art.featuredImage).width(w).format("jpg").url()} ${w}w`,
                            )
                            .join(", ")}
                          sizes="(max-width: 768px) 90vw, 58vw"
                          alt={art.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </picture>
                    ) : (
                      <div className="w-full h-full bg-stone-200" />
                    )}
                  </div>

                  {/* Right — metadata */}
                  <div className="w-full md:w-[42%] shrink-0 px-6 py-8 md:px-14 md:py-16 flex flex-col gap-6 md:gap-11 bg-[#EDE9E6] overflow-y-auto md:overflow-y-visible">
                    <div className="flex flex-col gap-4 md:gap-6">
                      <span
                        className="text-xs tracking-[0.28em] text-gray-400 uppercase"
                        style={{
                          fontFamily: "’Roboto Mono’, monospace",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                        &nbsp;/&nbsp;
                        {String(arts.length).padStart(2, "0")}
                      </span>

                      <h2
                        className="font-semibold leading-tight"
                        style={{
                          fontFamily: "’Playfair Display’, serif",
                          fontSize: "clamp(22px, 3.2vw, 52px)",
                        }}
                      >
                        {art.title}
                      </h2>

                      <div className="w-8 h-px bg-black" />
                      <div>
                        {art.dimensions && (
                          <i
                            className="text-[0.7rem]  text-gray-600 leading-relaxed text-justify max-w-xs"
                            style={{
                              fontFamily: "’Roboto Mono’, monospace",
                            }}
                          >
                            {art.dimensions}
                          </i>
                        )}
                      </div>
                      <div>
                        {art.description && (
                          <p
                            className="text-[0.7rem] text-gray-600 leading-relaxed text-justify max-w-xs"
                            style={{
                              fontFamily: "’Roboto Mono’, monospace",
                            }}
                          >
                            {art.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {(art.year || art.category || art.medium) && (
                      <div className="flex items-start flex-col gap-2">
                        {art.medium && (
                          <span
                            className="text-xs text-gray-400"
                            style={{
                              fontFamily: "’Roboto Mono’, monospace",
                            }}
                          >
                            {art.medium}
                          </span>
                        )}
                        {art.category && (
                          <span
                            className="text-xs text-gray-400 uppercase tracking-widest"
                            style={{
                              fontFamily: "’Roboto Mono’, monospace",
                            }}
                          >
                            {art.category}
                          </span>
                        )}
                        {art.year && (
                          <span
                            className="text-xs text-gray-400"
                            style={{
                              fontFamily: "’Roboto Mono’, monospace",
                            }}
                          >
                            {art.year}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        {/* Progress pill indicator */}
        {arts.length > 0 && (
          <div className="absolute bottom-8 right-14 flex gap-1.5 items-center">
            {arts.map((_, i) => (
              <div
                key={i}
                className="rounded-full bg-gray-400 transition-all duration-500"
                style={{
                  width: i === activeIndex ? "20px" : "4px",
                  height: "4px",
                  opacity: i === activeIndex ? 1 : 0.35,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Work. title ── */}
      <section className="relative ">
        <div className="absolute md:bottom-30 bottom-18 right-10 overflow-hidden z-999">
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
      </section>
    </main>
  );
}
