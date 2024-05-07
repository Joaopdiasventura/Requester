import { useEffect, useState, useRef } from "react";
import icon from "../svgs/donloadIcon.svg";

export function DownloadButton() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [options, setOptions] = useState<string[]>([]);

  const download = () => {
    let url = "";
    const platform = selectRef.current
      ? selectRef.current.value
      : window.navigator.platform;

    if (platform.startsWith("Win")) {
      url =
        "https://joaopdiasventura.github.io/Requester/web-site/src/assets/requester-1.0.2-setup.zip";
    } else {
      url =
        "https://joaopdiasventura.github.io/Requester/web-site/src/assets/requester_1.0.1_amd64.zip";
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = url;
    console.log(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const { platform } = window.navigator;
    const defaultOptions = ["Windows", "Linux"];

    if (platform.startsWith("Win")) {
      setOptions(defaultOptions);
    } else {
      setOptions([defaultOptions[1], defaultOptions[0]]);
    }
  }, []);

  return (
    <select
      className="bg-red-600 border border-white p-1 px-4 rounded-lg focus:outline-none"
      onClick={download}
      ref={selectRef}
    >
      {options.map((option, index) => (
        <option key={index}>
          <img src={icon} alt="" />
          {option}
        </option>
      ))}
    </select>
  );
}
