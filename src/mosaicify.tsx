import { clsx } from "clsx";
import { useMemo } from "react";

/**
 * Props for the `Mosaicify` component.
 *
 * @remarks
 * Supply an array of data objects containing at minimum an `id` and an
 * `imageUrl`. The component will render a dense CSS grid of square tiles
 * comprised of a random subset of images and placeholder tiles.
 */
interface MosaicifyProps {
  data: {
    imageUrl: string;
    id: string;
    [key: string]: any;
  }[];
  /**
   * Optional CSS class to apply to the outer grid container.
   */
  className?: string;
  /**
   * Optional CSS class to apply to each grid item (image or placeholder).
   */
  gridClassName?: string;
  /**
   * Number of grid columns to render. Higher values produce smaller tiles.
   *
   * @defaultValue 20
   */
  numberOfColumns?: number;
}


/**
 * Renders a responsive, dense mosaic grid from a list of items, mixing a
 * randomized selection of images with placeholder tiles for visual variety.
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
const Mosaicify= ({
  data,
  className,
  gridClassName,
  numberOfColumns = 20,
}: MosaicifyProps) => {
  const gridTemplateColumns = useMemo(
    () => `repeat(${numberOfColumns}, minmax(0, 1fr))`,
    [numberOfColumns],
  );

  const gridItems = useMemo(() => {
    const numberOfImages = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    const actualNumberOfImages = Math.min(numberOfImages, data.length);

    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    const imageIndices = new Set(
      Array.from({ length: actualNumberOfImages }, (_, i) => i),
    );

    const allItems = shuffledData.map((item, index) => ({
      ...item,
      type: imageIndices.has(index)
        ? ('image' as const)
        : ('placeholder' as const),
    }));

    return allItems.sort(() => Math.random() - 0.5);
  }, [data]);

  /**
   * Derives a Tailwind size class for an item, biasing placeholders toward
   * smaller sizes and images toward a prominent size.
   *
   * @param item - A grid item enhanced with a `type` discriminant.
   * @returns A space-delimited Tailwind class string controlling span/rounding.
   */
  const getSizeClass = (item: (typeof gridItems)[number]) => {
    const imageSizeClasses = ['col-span-4 row-span-4 rounded-lg'];

    const placeholderSizeClasses = [
      ...Array(10).fill('col-span-1 row-span-1 rounded-sm'), // 10 chances for 1x1
      ...Array(3).fill('col-span-2 row-span-2 rounded-md'), // 3 chances for 2x2
      ...Array(1).fill('col-span-3 row-span-3 rounded-lg'), // 1 chance for 3x3
    ];

    if (item.type === 'image') {
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
      className={clsx('grid gap-[3px] grid-auto-flow:dense', className)}
      style={{ gridTemplateColumns }}
    >
      {gridItems.map((item) => {
        const sizeClass = getSizeClass(item);
        if (item.type === 'image') {
          return (
            <div
              key={item.id}
              className={clsx(
                'aspect-square relative overflow-hidden',
                sizeClass,
                gridClassName,
              )}
            >
              <img
                alt={`Profile of ${item.id}`}
                className="object-cover w-full h-full"
                src={item.imageUrl}
              />
            </div>
          );
        }
        return (
          <div
            key={item.id}
            className={clsx(
              'aspect-square bg-slate-600',
              sizeClass,
              gridClassName,
            )}
          />
        );
      })}
    </div>
  );
};

export default Mosaicify;