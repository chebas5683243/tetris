import { cn } from "@/utils";

interface Props {
  id: number;
  color?: string;
  isProjection?: boolean;
}

export function Block({ id, color = "gray", isProjection }: Props) {
  return (
    <div
      id={`${id}`}
      className={cn("w-8 aspect-square border-4 border-gray-900", {
        "bg-cyan-600 border-l-cyan-400 border-t-cyan-400 border-b-cyan-950 border-r-cyan-950":
          color === "cyan",
        "bg-blue-600 border-l-blue-400 border-t-blue-400 border-b-blue-950 border-r-blue-950":
          color === "blue",
        "bg-orange-600 border-l-orange-400 border-t-orange-400 border-b-orange-950 border-r-orange-950":
          color === "orange",
        "bg-green-600 border-l-green-400 border-t-green-400 border-b-green-950 border-r-green-950":
          color === "green",
        "bg-red-600 border-l-red-400 border-t-red-400 border-b-red-950 border-r-red-950":
          color === "red",
        "bg-yellow-600 border-l-yellow-400 border-t-yellow-400 border-b-yellow-950 border-r-yellow-950":
          color === "yellow",
        "bg-purple-600 border-l-purple-400 border-t-purple-400 border-b-purple-950 border-r-purple-950":
          color === "purple",
        "bg-gray-900 border-l-gray-800 border-t-gray-800 border-b-gray-950 border-r-gray-950":
          color === "gray",
        "bg-gray-900 border-dashed border-cyan-600":
          isProjection && color === "cyan",
        "bg-gray-900 border-dashed border-blue-600":
          isProjection && color === "blue",
        "bg-gray-900 border-dashed border-orange-600":
          isProjection && color === "orange",
        "bg-gray-900 border-dashed border-green-600":
          isProjection && color === "green",
        "bg-gray-900 border-dashed border-red-600":
          isProjection && color === "red",
        "bg-gray-900 border-dashed border-yellow-600":
          isProjection && color === "yellow",
        "bg-gray-900 border-dashed border-purple-600":
          isProjection && color === "purple",
      })}
    />
  );
}
