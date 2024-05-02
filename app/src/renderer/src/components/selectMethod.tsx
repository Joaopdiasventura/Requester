import { ChangeEvent, ComponentProps, useState } from "react";

export function SelectMethodComponent(props: ComponentProps<"select">): JSX.Element {
  const [Class, setClass] = useState("text-green-600 bg-transparent focus:ring-0");
  const changeColor = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const colors = {
      get: "text-green-600",
      post: "text-yellow-600",
      put: "text-orange-500",
      patch: "text-orange-700",
      delete: "text-red-600"
    };

    const str = `${colors[value]} bg-transparent focus:ring-0`;
    setClass(str);
  };
  return (
    <select name="" id="" className={Class} onChange={changeColor} {...props}>
      <option value="get" className="bg-zinc-950 text-green-600">
        GET
      </option>
      <option value="post" className="bg-zinc-950 text-yellow-600">
        POST
      </option>
      <option value="put" className="bg-zinc-950 text-orange-500">
        PUT
      </option>
      <option value="patch" className="bg-zinc-950 text-orange-700">
        PATCH
      </option>
      <option value="delete" className="bg-zinc-950 text-red-600">
        DELETE
      </option>
    </select>
  );
}
