import { useState } from "react";

const LocationButton = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6),
                    });
                    setError(null);
                },
                (error) => {
                    setError("❌ Unable to retrieve location. Please allow location access.");
                    console.error("Error getting location:", error);
                }
            );
        } else {
            setError("❌ Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="bg-white shadow-2xl rounded-2xl p-8 text-center w-[350px] flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">📍 Find My Location</h2>

                <button
                    onClick={getLocation}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition transform duration-300"
                >
                    Get My Location
                </button>

                {location && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-full text-gray-800">
                        <p className="text-lg font-medium text-center">🌍 Latitude: <span className="font-bold">{location.latitude}</span></p>
                        <p className="text-lg font-medium text-center">🌎 Longitude: <span className="font-bold">{location.longitude}</span></p>
                    </div>
                )}

                {error && <p className="mt-4 text-red-600 text-lg font-medium">{error}</p>}
            </div>
        </div>
    );
};

export default LocationButton;
