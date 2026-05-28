import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import contactImg from "../assets/IMG_4272.JPG.jpeg";
import { usePageTransition } from "../context/TransitionContext";

export default function Contact() {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const {
    registerExit,
    captureSharedImage,
    peekSharedImage,
    clearSharedImage,
  } = usePageTransition();

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
          if (targetPath === "/about") {
            captureSharedImage(imageRef.current);
          } else {
            clearSharedImage();
          }
          const tl = gsap.timeline({ onComplete: resolve });
          tl.to(
            imageRef.current,
            { opacity: 0, duration: 0.35, ease: "power2.in" },
            0,
          ).to(
            titleRef.current,
            { y: -20, opacity: 0, duration: 0.45, ease: "power2.in" },
            0,
          );
        }),
    );

    const data = peekSharedImage();
    if (data && imageRef.current) {
      clearSharedImage();
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.85,
        ease: "expo.out",
      });
      gsap.fromTo(
        titleRef.current,
        { yPercent: 0, opacity: 0 },
        {
          yPercent: 10,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    } else {
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
    }

    const title = titleRef.current;
    const image = imageRef.current;
    return () => gsap.killTweensOf([title, image]);
  }, [registerExit, captureSharedImage, peekSharedImage, clearSharedImage]);

  return (
    <main className="flex flex-col min-h-screen px-6 relative overflow-y-hidden ">
      <div className="absolute bottom-30 left-10 overflow-hidden ">
        <h1
          ref={titleRef}
          className="font-semibold leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
          }}
        >
          Contact.
        </h1>
      </div>
      <div className="absolute top-10 right-8">
        <img
          ref={imageRef}
          src={contactImg}
          alt="contact image"
          className="w-80 h-100 object-cover"
        />
      </div>
      <div className="mt-10 text-gray-700 text-lg leading-relaxed flex flex-row gap-14 max-w-4xl">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span
              className="text-[#000000]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              /Location
            </span>
            <span className="text-sm">Anambra, Awka.</span>
          </div>
          <div className="flex flex-col gap-1 text-sm mt-4">
            <span>Tel:+2348025053067</span>
            <span>IG: domniksgallery</span>
          </div>
        </div>
        <div>
          <span className="text-sm">TikTok: +2348025053067</span>
        </div>
      </div>
    </main>
  );
}
