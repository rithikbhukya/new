import { useState } from "react";

const Jsgoogleapi = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    setLocation({
                        latitude: latitude.toFixed(6),
                        longitude: longitude.toFixed(6),
                        accuracy: accuracy.toFixed(2), // Accuracy in meters
                    });

                    setError(null);

                    // Fetch address using Google API
                    getAddressFromCoords(latitude, longitude);
                },
                (error) => {
                    setError("❌ Unable to retrieve location. Please allow location access.");
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true, // Request high accuracy
                    timeout: 10000, // Max wait time
                    maximumAge: 0, // No cached positions
                }
            );
        } else {
            setError("❌ Geolocation is not supported by this browser.");
        }
    };

    const getAddressFromCoords = async (lat, lng) => {
        const API_KEY = "AIzaSyD65RKBAGVtP_QeI-cF-NnEjpN6GBtcOVg";
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
                setAddress(data.results[0].formatted_address);
            } else {
                setAddress("⚠️ Address not found");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("❌ Error fetching address");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white shadow-2xl rounded-2xl p-8 text-center w-[400px] flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">📍 Get My Location</h2>

                <button
                    onClick={getLocation}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
                >
                    Get My Location
                </button>

                {location && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-full text-gray-800">
                        <p className="text-lg font-medium text-center">
                            🌍 Latitude: <span className="font-bold">{location.latitude}</span>
                        </p>
                        <p className="text-lg font-medium text-center">
                            🌎 Longitude: <span className="font-bold">{location.longitude}</span>
                        </p>
                        <p className="text-lg font-medium text-center">
                            📏 Accuracy: <span className="font-bold">{location.accuracy} meters</span>
                        </p>
                        {address && (
                            <p className="text-lg font-medium text-center mt-3">
                                🏠 Address: <span className="font-bold">{address}</span>
                            </p>
                        )}
                    </div>
                )}

                {error && <p className="mt-4 text-red-600 text-lg font-medium">{error}</p>}
            </div>
        </div>
    );
};

export default Jsgoogleapi;
