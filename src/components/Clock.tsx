"use client";
import { useEffect, useState } from "react";

export function Clock({ className }: { className?: string }) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // ハイドレーションエラーを避けるため、マウント後に時間を設定
    setCurrentTime(new Date());

    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // マウント前は表示を固定
  if (!currentTime) {
    return <p className={className}>--:--:--</p>;
  }
  return <p className={className}>{currentTime.toLocaleTimeString("ja-JP")}</p>;
}
