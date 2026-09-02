import { useEffect, useState } from "react";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-24 w-24 text-2xl",
  xl: "h-32 w-32 text-3xl",
};

const UserAvatar = ({ src, name, size = "md", className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const initial = (name || "U").charAt(0).toUpperCase();
  const sizeClass = sizes[size] || sizes.md;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={name || "User"}
        onError={() => setImageError(true)}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-primary text-white flex items-center justify-center font-semibold ${sizeClass} ${className}`}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;
