import { cn } from "@/lib/utils";
import DropdownButtonUpdate from "@/componenst/DropdownUpdate";

interface Props {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  title?: string;
  description?: string;
  pic?: string;
  status: string;
}

export default function CardList({
  className,
  color,
  pic,
  description,
  title,
  status,
}: Props) {
  return (
    <div
      className={cn(
        "w-full min-h-[140px] h-fit bg-white shadow-sm rounded-lg border border-gray-300 py-3 pl-2 pr-6 flex gap-4 mb-4",
        className,
        color
      )}
    >
      <div
        className={cn(
          `h-[140px] w-[8px] rounded `,
          status === "not_started" ? "bg-gray-500" : "",
          status === "on_progress" ? "bg-yellow-500" : "",
          status === "done" ? "bg-green-500" : "",
          status === "reject" ? "bg-red-500" : ""
        )}
      ></div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">{title}</h3>
            <p className="text-sm">status : {status}</p>
          </div>

          <h4 className="text-sm">{description}</h4>
        </div>

        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-semibold">pic : {pic}</p>
          <DropdownButtonUpdate />
        </div>
      </div>
    </div>
  );
}
