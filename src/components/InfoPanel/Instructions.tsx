export function Instructions() {
  return (
    <div className="flex flex-col gap-2 text-gray-200">
      <h1 className="text-xl">Instructions</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-lg h-8">Move left</span>
          <span className="text-lg h-8">Move right</span>
          <span className="text-lg h-8">Move down</span>
          <span className="text-lg h-8">Drop</span>
          <span className="text-lg h-8">Rotate</span>
          <span className="text-lg h-8">Hold</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <span className="flex justify-center h-8 text-gray-200 text-xl border border-gray-700">
            ←
          </span>
          <span className="flex justify-center h-8 text-gray-200 text-xl border border-gray-700">
            →
          </span>
          <span className="flex justify-center h-8 text-gray-200 text-xl border border-gray-700">
            ↓
          </span>
          <span className="flex justify-center h-8 text-gray-200 text-xl border border-gray-700">
            ↑
          </span>
          <span className="flex justify-center h-8 text-gray-200 text-xl border border-gray-700">
            Space
          </span>
          <span className="flex justify-center h-8 text-gray-200 text-xl border border-gray-700">
            C
          </span>
        </div>
      </div>
    </div>
  );
}
