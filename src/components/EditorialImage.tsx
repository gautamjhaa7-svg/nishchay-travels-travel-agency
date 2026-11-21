import {useState} from 'react';
import {Compass} from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  priority = false,
  fallbackTitle,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0D1B2E] via-[#07111F] to-[#13253D] text-[#D6B77A]/70 p-6 text-center"
      >
        <Compass className="w-7 h-7 mb-2 stroke-[1.25]" aria-hidden="true" />
        <span className="font-serif text-base text-[#F7F4EE]/80">
          {fallbackTitle || 'Nishchay Tours & Travels'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
