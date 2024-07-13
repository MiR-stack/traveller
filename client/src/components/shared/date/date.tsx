import { FaPencil } from "react-icons/fa6";
import "@/styles/components/shared/date.scss";

function Date({ date, className }: { date: string; className?: string }) {
  return (
    <p className={`date ${className ?? ""}`}>
      <FaPencil />
      {date}
    </p>
  );
}

export default Date;
