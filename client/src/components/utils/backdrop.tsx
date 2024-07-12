import "@/styles/components/utils.scss";

function Backdrop({ onClick }: { onClick: () => void }) {
  return <div className="backdrop" onClick={onClick}></div>;
}

export default Backdrop;
