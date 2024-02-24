import { ReactComponent as Doctor } from "../../image/doctor.svg";

function DoctorIcon() {
  return (
    <div className="w-2 h-2 flex-none">
      <Doctor style={{ width: "30px", height: "30px" }} />
    </div>
  );
}

export default DoctorIcon;
