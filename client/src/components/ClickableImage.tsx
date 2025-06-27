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
  className = "glass-card aspect-video flex items-center justify-center cursor-pointer"
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
            <img
              ref={imgRef}
              src={src}
              alt={alt || "Clickable image"}
              loading="lazy"
              onLoad={handleImageLoad}
              className={`w-full h-full object-cover rounded-2xl image-thumbnail transition-opacity duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-white/5 rounded-2xl flex items-center justify-center image-skeleton">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
              </div>
            )}
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