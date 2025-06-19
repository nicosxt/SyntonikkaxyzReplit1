import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  altText?: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, altText }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Image container */}
        <div 
          className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={altText || "Full size image"}
              className="max-w-full max-h-[80vh] object-contain"
            />
          ) : (
            <div className="w-[80vw] h-[60vh] flex items-center justify-center text-gray-400">
              <span>Image placeholder - click to close</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}