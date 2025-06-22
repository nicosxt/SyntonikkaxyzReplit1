import { useState, useEffect, useRef } from "react";
import ImageModal from "./ImageModal";
import { preloadImage } from "../utils/imageOptimization";

interface ClickableImageProps {
  src?: string;
  alt?: string;
  placeholderText?: string;
  className?: string;
}

export default function ClickableImage({ 
  src, 
  alt, 
  placeholderText = "Image Placeholder", 
  className = "bg-white/5 rounded-2xl aspect-video flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
}: ClickableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload image on hover for smoother modal opening
  const handleMouseEnter = async () => {
    if (src && !isPreloaded) {
      try {
        await preloadImage(src);
        setIsPreloaded(true);
      } catch (error) {
        console.warn('Failed to preload image:', src);
      }
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <div 
        className={className}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={handleMouseEnter}
      >
        {src ? (
          <div className="relative w-full h-full">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-white/5 rounded-2xl flex items-center justify-center image-skeleton">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              ref={imgRef}
              src={src}
              alt={alt || "Case study image"}
              loading="lazy"
              onLoad={handleImageLoad}
              className={`w-full h-full object-cover rounded-2xl transition-all duration-500 hover:scale-105 image-thumbnail ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                willChange: 'transform',
                // Optimize for thumbnail display
                maxWidth: '100%',
                height: '100%'
              }}
            />
          </div>
        ) : (
          <span className="text-gray-500">{placeholderText}</span>
        )}
      </div>
      
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={src}
        altText={alt}
      />
    </>
  );
}