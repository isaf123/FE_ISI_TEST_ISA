import { cn } from "@/lib/utils";
import { StatusTodo } from "@/types/types";
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
      <div className={`h-[140px] w-[8px] rounded bg-red-400 `}></div>
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
          <button className="rounded-md cursor-pointer px-3 py-2 bg-gray-800 text-gray-50 text-sm">
            update
          </button>
        </div>
      </div>
    </div>
  );
}
