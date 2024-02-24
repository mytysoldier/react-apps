import DoctorIcon from "../components/image/DoctorIcon";
import NinjaIcon from "../components/image/NinjaIcon";
import OjisanIcon from "../components/image/OjisanIcon";
import OperatorIcon from "../components/image/OperatorIcon";
import TaisyoIcon from "../components/image/TaisyoIcon";
import WrestlerIcon from "../components/image/WrestlerIcon";

export const userIconMap: { [key: string]: JSX.Element } = {
  "1": <DoctorIcon />,
  "2": <NinjaIcon />,
  "3": <OjisanIcon />,
  "4": <OperatorIcon />,
  "5": <TaisyoIcon />,
  "6": <WrestlerIcon />,
};
