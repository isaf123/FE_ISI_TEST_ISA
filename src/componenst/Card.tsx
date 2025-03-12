import { cn } from "@/lib/utils";
interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        "min-w-[200px] min-h-[480px] h-fit bg-gray-50 shadow-sm rounded-xl border border-gray-300 py-6 px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
