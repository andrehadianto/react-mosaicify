import { ComponentPropsWithoutRef, ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Tooltip from "./tooltip";

/**
 * Props for the `Mosaicify` component.
 *
 * @remarks
 * Supply an array of data objects containing at minimum an `id` and an
 * `imageUrl`. The component will render a dense CSS grid of square tiles
 * comprised of a random subset of images and placeholder tiles.
 */
interface MosaicifyProps extends ComponentPropsWithoutRef<"div"> {
  data: {
    imageUrl: string;
    id: string;
    onClick?: () => void;
    [key: string]: any;
  }[];
  /**
   * Optional function to render tooltip content for each grid item.
   *
   * @param item - The data item for the grid cell.
   * @returns The React node to display in the tooltip.
   */
  withTooltip?: (item: MosaicifyProps["data"][number]) => ReactNode;
  /**
   * Position of the tooltip.
   * @defaultValue "top"
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * Alignment of the tooltip.
   * @defaultValue "center"
   */
  tooltipAlignment?: "start" | "center" | "end";
  /**
   * Optional CSS class to apply to the outer grid container.
   */
  className?: string | undefined;
  /**
   * Optional CSS class to apply to each grid item (image or placeholder).
   */
  gridClassName?: string | undefined;
  /**
   * Number of grid columns to render. Higher values produce smaller tiles.
   *
   * @defaultValue 20
   */
  numberOfColumns?: number | undefined;
  /**
   * Minimum number of images to include in the mosaic on each render.
   * Must be provided together with `maxNumberOfImages`.
   *
   * @defaultValue 5
   */
  minNumberOfImages?: number | undefined;
  /**
   * Maximum number of images to include in the mosaic on each render.
   * Must be provided together with `minNumberOfImages`.
   *
   * @defaultValue 10
   */
  maxNumberOfImages?: number | undefined;
}

/**
 * Renders a responsive, dense mosaic grid from a list of items, mixing a
 * randomized selection of images with placeholder tiles for visual variety.
 *
 * @remarks
 * Image selection and tile sizing are randomized per render. The selection is
 * recomputed when `data` changes. Grid density is achieved via CSS `grid-auto-flow:
 * dense` and a configurable number of columns.
 *
 * @throws Error if only one of `minNumberOfImages` or `maxNumberOfImages` is provided.
 * @throws Error if `minNumberOfImages` is greater than `maxNumberOfImages`.
 *
 * @param props - {@link MosaicifyProps}
 * @returns A React element containing the mosaic grid.
 *
 * @example
 * ```tsx
 * <Mosaicify
 *   data={[{ id: 'u1', imageUrl: 'https://example.com/u1.jpg' }]}
 *   numberOfColumns={16}
 * />
 * ```
 */
const Mosaicify = ({
  data,
  className,
  gridClassName,
  numberOfColumns = 20,
  minNumberOfImages = 5,
  maxNumberOfImages = 10,
  withTooltip,
  tooltipPosition,
  tooltipAlignment,
}: MosaicifyProps) => {
  if (
    (minNumberOfImages && !maxNumberOfImages) ||
    (!minNumberOfImages && maxNumberOfImages)
  ) {
    throw new Error(
      "minNumberOfImages and maxNumberOfImages must be provided together",
    );
  }

  if (minNumberOfImages > maxNumberOfImages) {
    throw new Error(
      "minNumberOfImages must be less than or equal to maxNumberOfImages",
    );
  }

  const gridTemplateColumns = useMemo(
    () => `repeat(${numberOfColumns}, minmax(0, 1fr))`,
    [numberOfColumns],
  );

  const gridItems = useMemo(() => {
    const numberOfImages =
      Math.floor(Math.random() * (maxNumberOfImages - minNumberOfImages + 1)) +
      minNumberOfImages;
    const actualNumberOfImages = Math.min(numberOfImages, data.length);

    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    const imageIndices = new Set(
      Array.from({ length: actualNumberOfImages }, (_, i) => i),
    );

    const allItems = shuffledData.map((item, index) => ({
      ...item,
      type: imageIndices.has(index)
        ? ("image" as const)
        : ("placeholder" as const),
    }));

    return allItems.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /**
   * Derives a Tailwind size class for an item, biasing placeholders toward
   * smaller sizes and images toward a prominent size.
   *
   * @param item - A grid item enhanced with a `type` discriminant.
   * @returns A space-delimited Tailwind class string controlling span/rounding.
   */
  const getSizeClass = (item: (typeof gridItems)[number]) => {
    const imageSizeClasses = ["col-span-4 row-span-4 rounded-lg"];

    const placeholderSizeClasses = [
      ...Array(10).fill("col-span-1 row-span-1 rounded-sm"), // 10 chances for 1x1
      ...Array(3).fill("col-span-2 row-span-2 rounded-md"), // 3 chances for 2x2
      ...Array(1).fill("col-span-3 row-span-3 rounded-lg"), // 1 chance for 3x3
    ];

    if (item.type === "image") {
      return imageSizeClasses[
        Math.floor(Math.random() * imageSizeClasses.length)
      ];
    }

    return placeholderSizeClasses[
      Math.floor(Math.random() * placeholderSizeClasses.length)
    ];
  };

  return (
    <div
      className={twMerge("grid [grid-auto-flow:dense] gap-0.5", className)}
      style={{ gridTemplateColumns }}
    >
      {gridItems.map((item) => {
        const sizeClass = getSizeClass(item);
        const tooltipContent = withTooltip ? withTooltip(item) : null;

        const renderItem = () => {
          if (item.type === "image") {
            return (
              <div
                className={twMerge(
                  "relative aspect-square overflow-hidden",
                  "bg-slate-600 hover:opacity-80",
                  "duration-200 hover:scale-105 hover:shadow-2xl",
                  sizeClass,
                  gridClassName,
                )}
                onClick={item.onClick}
              >
                <img
                  alt={`Profile of ${item.id}`}
                  className="h-full w-full object-cover"
                  src={item.imageUrl}
                />
              </div>
            );
          }
          return (
            <div
              className={twMerge(
                "aspect-square bg-slate-600 hover:bg-slate-800",
                "duration-200 hover:scale-105 hover:shadow-2xl",
                sizeClass,
                gridClassName,
              )}
              onClick={item.onClick}
            />
          );
        };

        if (tooltipContent) {
          return (
            <Tooltip
              key={item.id}
              alignment={tooltipAlignment}
              containerClassName={twMerge(sizeClass, gridClassName)}
              content={tooltipContent}
              position={tooltipPosition}
            >
              {renderItem()}
            </Tooltip>
          );
        }

        return renderItem();
      })}
    </div>
  );
};

export default Mosaicify;
