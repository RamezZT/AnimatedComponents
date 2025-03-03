type DropIndicatorProps = {
  beforeId: string | null;
};
export const DropIndicator = ({ beforeId }: DropIndicatorProps) => {
  return (
    <span
      data-before={beforeId?.toString() || "-1"}
      className="absolute indicator h-full  w-[6px] rounded-full -left-[10px] bg-amber-50/100 opacity-0 transition-all duration-150"
    />
  );
};
