import { ReactComponent as Wrestler } from "../../image/wrestler.svg";

function WrestlerIcon() {
  return (
    <div className="w-2 h-2 flex-none">
      <Wrestler style={{ width: "30px", height: "30px" }} />
    </div>
  );
}

export default WrestlerIcon;
