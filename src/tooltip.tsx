import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TooltipProps
  extends Omit<ComponentPropsWithoutRef<"div">, "content"> {
  content: ReactNode;
  children: ReactNode;
  containerClassName?: string;
  position?: "top" | "bottom" | "left" | "right";
  alignment?: "start" | "center" | "end";
}

const Tooltip = ({
  content,
  children,
  className,
  containerClassName,
  position = "top",
  alignment = "center",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const alignmentClasses = {
    top: {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    },
    bottom: {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    },
    left: {
      start: "top-0",
      center: "top-1/2 -translate-y-1/2",
      end: "bottom-0",
    },
    right: {
      start: "top-0",
      center: "top-1/2 -translate-y-1/2",
      end: "bottom-0",
    },
  };

  return (
    <div
      className={twMerge("relative", containerClassName)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={twMerge(
            "absolute z-10",
            "rounded-md bg-black px-2 py-1 text-xs text-white",
            "opacity-90 transition-opacity duration-300",
            positionClasses[position],
            alignmentClasses[position][alignment],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
