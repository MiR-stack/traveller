import variables from "@/styles/base/_constant.module.scss";
import "@/styles/components/shared/shortInfo.scss";

interface shortInfoPropsType {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

function ShortInfo({ icon, text, className }: shortInfoPropsType) {
  return (
    <div className={`${variables.brandName}-shortInfo ${className ?? ""}`}>
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default ShortInfo;
