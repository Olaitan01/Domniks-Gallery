import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import contactImg from "../assets/IMG_4272.JPG.jpeg";
import contact_400_webp from "../assets/optimized/IMG_4272.JPG-400.webp";
import contact_800_webp from "../assets/optimized/IMG_4272.JPG-800.webp";
import contact_1200_webp from "../assets/optimized/IMG_4272.JPG-1200.webp";
import contact_400_jpg from "../assets/optimized/IMG_4272.JPG-400.jpg";
import contact_800_jpg from "../assets/optimized/IMG_4272.JPG-800.jpg";
import contact_1200_jpg from "../assets/optimized/IMG_4272.JPG-1200.jpg";
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
    <main className="flex flex-col min-h-screen  px-4 md:px-6 relative overflow-x-hidden md:overflow-y-hidden">
      {/* Title: flows on mobile, absolute on desktop */}
      <div className="overflow-hidden mb-10 pt-6 md:pt-0 md:absolute md:bottom-30 md:left-10">
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

      {/* Image: flows on mobile (right-aligned), absolute on desktop */}
      <div className="flex  md:justify-end md:block md:absolute md:top-10 md:right-8  mb-6 md:mb-0">
        <picture>
          <source type="image/webp" srcSet={`${contact_400_webp} 400w, ${contact_800_webp} 800w, ${contact_1200_webp} 1200w`} sizes="(max-width: 768px) 90vw, 25vw" />
          <img
            ref={imageRef}
            src={contact_800_jpg}
            srcSet={`${contact_400_jpg} 400w, ${contact_800_jpg} 800w, ${contact_1200_jpg} 1200w`}
            sizes="(max-width: 768px) 90vw, 25vw"
            alt="contact image"
            loading="lazy"
            decoding="async"
            className="w-80 h-auto md:w-80 md:h-100 object-fill"
            style={{ willChange: "transform" }}
          />
        </picture>
      </div>

      <div className=" md:mt-10 gap-0 text-gray-700 text-lg leading-relaxed flex flex-col md:flex-row  md:gap-14 max-w-4xl">
        <div className="flex flex-col gap-2 ">
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
