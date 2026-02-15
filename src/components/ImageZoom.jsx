import React, { useState, useRef } from "react";

const ImageZoom = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const zoomScale = 2;

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    container.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    const container = containerRef.current;
    if (!container) return;

    container.style.backgroundSize = `${zoomScale * 100}%`;
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;

    container.style.backgroundSize = "100%";
    container.style.backgroundPosition = "center";
  };

  return (
    <>
      <img
        src={src}
        alt=""
        className="cursor-pointer h-128 w-116 object-cover"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-in">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute text-black  top-6 right-8 px-3 py-2  font-semibold text-md z-50 border rounded-sm bg-white"
          >
            ✕
          </button>

          <div
            ref={containerRef}
            className="h-screen max-w-4xl w-5/12 border border-white bg-no-repeat bg-center bg-contain transition-all duration-200"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "100%",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      )}
    </>
  );
};

export default ImageZoom;
