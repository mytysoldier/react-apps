import { ReactComponent as Ninja } from "../../image/ninja.svg";

function NinjaIcon() {
  return (
    <div className="w-2 h-2 flex-none">
      <Ninja style={{ width: "30px", height: "30px" }} />
    </div>
  );
}

export default NinjaIcon;
