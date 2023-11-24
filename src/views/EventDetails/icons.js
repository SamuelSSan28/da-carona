import {
  FaCar,
  FaMotorcycle,
  FaBus,
  FaShuttleVan,
  FaBusAlt,
} from "react-icons/fa";

const vehicleIcons = {
  car: {
    icon: <FaCar />,
    label: "Carro",
  },
  motorcycle: {
    icon: <FaMotorcycle />,
    label: "Moto",
  },
  van: {
    icon: <FaShuttleVan />,
    label: "Van",
  },
  minibus: {
    icon: <FaBus />,
    label: "Micro-ônibus",
  },
  bus: {
    icon: <FaBusAlt />,
    label: "Ônibus",
  },
};

export default vehicleIcons;
