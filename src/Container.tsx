import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  styles?: string;
};
const Container = ({ children, styles }: PropsType) => {
  return (
    <div
      className={`${styles} min-h-screen bg-neutral-950 flex items-center justify-center`}
    >
      {children}
    </div>
  );
};

export default Container;
