"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;

// Helper to calculate the optimal loading sequence
const getLoadingSequence = () => {
  const sequence: number[] = [];
  const visited = new Set<number>();

  const addFrame = (frame: number) => {
    if (frame >= 1 && frame <= FRAME_COUNT && !visited.has(frame)) {
      sequence.push(frame);
      visited.add(frame);
    }
  };

  // 1. First frame (critical for initial render)
  addFrame(1);

  // 2. Sparse pass (every 8th frame) to quickly cover the timeline
  for (let i = 1; i <= FRAME_COUNT; i += 8) {
    addFrame(i);
  }
  addFrame(FRAME_COUNT);

  // 3. Medium pass (every 4th frame)
  for (let i = 1; i <= FRAME_COUNT; i += 4) {
    addFrame(i);
  }

  // 4. Semi-dense pass (every 2nd frame)
  for (let i = 1; i <= FRAME_COUNT; i += 2) {
    addFrame(i);
  }

  // 5. Dense pass (all remaining frames)
  for (let i = 1; i <= FRAME_COUNT; i++) {
    addFrame(i);
  }

  return sequence;
};

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const loadedImages: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    imagesRef.current = loadedImages;

    // Smart render function that finds and draws the nearest loaded frame
    const renderFrame = (frameIndex: number) => {
      let img = loadedImages[frameIndex];
      if (!img) {
        // Find nearest loaded frame
        let dist = 1;
        while (dist < FRAME_COUNT) {
          const prevIdx = frameIndex - dist;
          const nextIdx = frameIndex + dist;
          if (prevIdx >= 0 && loadedImages[prevIdx]) {
            img = loadedImages[prevIdx];
            break;
          }
          if (nextIdx < FRAME_COUNT && loadedImages[nextIdx]) {
            img = loadedImages[nextIdx];
            break;
          }
          dist++;
        }
      }

      if (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    let currentFrameIndex = 0;

    const updateFrameIndex = () => {
      if (!containerRef.current) return 0;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const containerTop = top + scrollY;
      const maxScroll = height - window.innerHeight;
      let progress = (scrollY - containerTop) / maxScroll;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      return Math.floor(progress * (FRAME_COUNT - 1));
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      currentFrameIndex = updateFrameIndex();
      renderFrame(currentFrameIndex);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // sets canvas dimension & initial frame

    let animationFrameId: number;
    const handleScroll = () => {
      currentFrameIndex = updateFrameIndex();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => renderFrame(currentFrameIndex));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Progressive loading sequence setup
    const sequence = getLoadingSequence();
    let activeRequests = 0;
    let sequenceIndex = 0;
    const CONCURRENCY = 6;

    const startLoading = () => {
      while (activeRequests < CONCURRENCY && sequenceIndex < sequence.length) {
        const frameNum = sequence[sequenceIndex];
        sequenceIndex++;
        activeRequests++;
        preloadFrame(frameNum);
      }
    };

    const preloadFrame = (frameNum: number) => {
      const img = new Image();
      const frameStr = frameNum.toString().padStart(5, "0");
      img.src = `/frames/${frameStr}.png`;
      img.onload = () => {
        loadedImages[frameNum - 1] = img;
        activeRequests--;
        
        // Redraw current frame to show updated details immediately
        renderFrame(currentFrameIndex);
        
        startLoading();
      };
      img.onerror = () => {
        activeRequests--;
        startLoading();
      };
    };

    startLoading();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const taglineOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.6) * 2.5));

  return (
    <div ref={containerRef} className="relative w-full h-[4000px]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505]">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Tagline */}
        <div 
          className="absolute bottom-16 left-0 w-full text-center flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{ opacity: taglineOpacity }}
        >
          <div className="absolute w-[120%] h-[200px] bg-primary/15 blur-[100px] rounded-full -z-10" />
          <h1 className="flex flex-col items-center justify-center font-bold tracking-wider drop-shadow-2xl">
            <div className="flex gap-8 text-6xl md:text-8xl text-white mb-2 mix-blend-screen">
              <span 
                className="transition-all duration-1000 ease-out" 
                style={{ 
                  opacity: scrollProgress > 0.70 ? 1 : 0, 
                  transform: scrollProgress > 0.70 ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  filter: scrollProgress > 0.70 ? 'blur(0px)' : 'blur(10px)'
                }}
              >
                Pure
              </span>
              <span 
                className="transition-all duration-1000 ease-out" 
                style={{ 
                  opacity: scrollProgress > 0.80 ? 1 : 0, 
                  transform: scrollProgress > 0.80 ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  filter: scrollProgress > 0.80 ? 'blur(0px)' : 'blur(10px)'
                }}
              >
                Fresh
              </span>
            </div>
            <span 
              className="text-[80px] md:text-[150px] leading-[0.9] font-black uppercase tracking-[0.05em] transition-all duration-1000 ease-out bg-gradient-to-br from-[#FF1744] via-[#FF6B9D] to-[#FF1744] bg-clip-text text-transparent mt-2" 
              style={{ 
                opacity: scrollProgress > 0.90 ? 1 : 0,
                transform: scrollProgress > 0.90 ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.85)',
                filter: scrollProgress > 0.90 ? 'drop-shadow(0 20px 40px rgba(255,23,68,0.5)) blur(0px)' : 'blur(20px)'
              }}
            >
              Premium
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
