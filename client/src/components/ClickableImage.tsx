import { useState } from "react";
import ImageModal from "./ImageModal";

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

  return (
    <>
      <div 
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Case study image"}
            className="w-full h-full object-cover rounded-2xl"
          />
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