"use client";

interface StepProgressBarProps {
  step: number; // 현재 스텝
  total: number; // 전체 스텝 수
  activeColor?: string; // 활성화 색
  inactiveColor?: string; // 비활성화 색
}

export default function StepProgressBar({
  step,
  total,
  activeColor = "#FF5126",
  inactiveColor = "#555",
}: StepProgressBarProps) {
  return (
    <div className="flex gap-2 py-5">
      {Array.from({ length: total }).map((_, index) => {
        const current = index + 1;
        const isActive = step >= current;

        return (
          <div
            key={current}
            className="py-1 flex-1"
            style={{
              backgroundColor: isActive ? activeColor : inactiveColor,
              transition: "0.3s",
            }}
          ></div>
        );
      })}
    </div>
  );
}
