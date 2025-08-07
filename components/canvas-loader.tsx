import { Card } from "./ui/card";

/**
 * Loading component displayed while Canvas is hydrating on the client side.
 * Matches the visual style of the garden interface.
 */
export function CanvasLoader() {
  return (
    <div className="relative flex items-center justify-center h-full overflow-hidden ">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Animated plant/garden icon */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-main rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-main mb-1">
            Growing your garden...
          </h3>
          <p className="text-sm text-gray-600">
            Loading your financial landscape
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-main rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-main rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-main rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
