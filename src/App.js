import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

function App() {
    const [ipAddress, setIpAddress] = useState("");
    const [location, setLocation] = useState("");
    const [timezone, setTimezone] = useState("");
    const [isp, setIsp] = useState("");
    const [coordinates, setCoordinates] = useState([51.505, -0.09]);

    const icon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png",
        iconSize: [38, 38],
    });

    function handleSubmit() {
        fetch(
            "https://geo.ipify.org/api/v2/country,city?apiKey=at_WMPxVn46k7dmJYVd6RVKiqJJ2wvHR&ipAddress=" +
                ipAddress
        )
            .then((res) => res.json())
            .then((data) => {
                setLocation(
                    data.location.city +
                        ", " +
                        data.location.country +
                        ", " +
                        data.location.postalCode
                );
                setTimezone("UTC " + data.location.timezone);
                setIsp(data.isp);
                setCoordinates([data.location.lat, data.location.lng]);
            })
            .catch((error) => console.log(error));
    }

    function ChangeMapView({ coordinates }) {
        const map = useMap();
        map.setView(coordinates, map.getZoom());
    }

    return (
        <div className="w-screen h-screen bg-black">
            <div className="w-screen h-2/5 bg-pattern-bg-desktop bg-cover flex flex-col items-center z-1">
                <h1 className="font-rubik text-white text-3xl font-medium mt-8">
                    IP Address Tracker
                </h1>
                <div className="flex w-screen justify-center items-center mt-8">
                    <input
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="Search for any IP address or domain"
                        className="focus:outline-none placeholder:font-medium font-rubik w-4/12 h-12 rounded-l-xl pl-6"
                    ></input>
                    <button
                        onClick={handleSubmit}
                        className="h-12 w-12 text-center font-medium bg-black text-white rounded-r-xl"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div className="w-screen h-3/5 flex justify-center">
                <div className="absolute z-10 py-8 rounded-2xl h-44 w-9/12 mt-[-72px] bg-white z-2 grid grid-cols-4 divide-x-2 divide-gray">
                    <div className="pl-8">
                        <p className="font-rubik text-dark-gray text-bold tracking-wider">
                            IP ADDRESS
                        </p>
                        <p className="font-rubik text-black text-3xl font-medium mt-2">
                            {ipAddress}
                        </p>
                    </div>
                    <div className="pl-8">
                        <p className="font-rubik text-dark-gray text-bold tracking-wider">
                            LOCATION
                        </p>
                        <p className="font-rubik text-black text-3xl font-medium mt-2">
                            {location}
                        </p>
                    </div>
                    <div className="pl-8">
                        <p className="font-rubik text-dark-gray text-bold tracking-wider">
                            TIMEZONE
                        </p>
                        <p className="font-rubik text-black text-3xl font-medium mt-2">
                            {timezone}
                        </p>
                    </div>
                    <div className="pl-8">
                        <p className="font-rubik text-dark-gray text-bold tracking-wider">
                            ISP
                        </p>
                        <p className="font-rubik text-black text-3xl font-medium mt-2">
                            {isp}
                        </p>
                    </div>
                </div>
                <div>
                    <MapContainer
                        center={coordinates}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <ChangeMapView coordinates={coordinates} />
                        <Marker position={coordinates} icon={icon}></Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default App;
