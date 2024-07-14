import "@/styles/components/shared/input.scss";

interface inputPropTypes {
  type?: "text" | "email";
  error?: string;
  placeholder?: string;
  name: string;
  value: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type = "text",
  error,
  name,
  value,
  placeholder,
  className,
  onChange,
}: inputPropTypes) {
  return (
    <div
      className={`input-container ${className ?? ""} ${
        error ? "input-error" : ""
      }`}
    >
      <input
        className={`input `}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error ? <span>{error}</span> : ""}
    </div>
  );
}

export default Input;
