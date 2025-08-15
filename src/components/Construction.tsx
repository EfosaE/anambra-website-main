import { AlertTriangle } from "lucide-react";

export default function Construction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          We’re working hard to finish the development of this page. Please
          check back soon!
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
