import { cn } from "@/utils";

interface Props {
  id: number;
  color?: string;
  isProjection: boolean;
}

export function Block({ id, color = "gray", isProjection }: Props) {
  return (
    <div
      id={`${id}`}
      className={cn("w-8 aspect-square border-4", {
        "bg-red-600 border-l-red-400 border-t-red-400 border-b-red-950 border-r-red-950":
          color === "red",
        "bg-blue-600 border-l-blue-400 border-t-blue-400 border-b-blue-950 border-r-blue-950":
          color === "blue",
        "bg-yellow-600 border-l-yellow-400 border-t-yellow-400 border-b-yellow-950 border-r-yellow-950":
          color === "yellow",
        "bg-green-600 border-l-green-400 border-t-green-400 border-b-green-950 border-r-green-950":
          color === "green",
        "bg-gray-900 border-l-gray-800 border-t-gray-800 border-b-gray-950 border-r-gray-950":
          color === "gray",
        "bg-gray-900 border-dashed border-red-600":
          isProjection && color === "red",
        "bg-gray-900 border-dashed border-blue-600":
          isProjection && color === "blue",
        "bg-gray-900 border-dashed border-yellow-600":
          isProjection && color === "yellow",
        "bg-gray-900 border-dashed border-green-600":
          isProjection && color === "green",
      })}
    />
  );
}
