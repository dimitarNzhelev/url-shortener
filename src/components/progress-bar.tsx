type ProgressBarProps = {
  linksLength: number;

  MAX_LINKS: number;
};

export default function ProgressBar({
  linksLength,
  MAX_LINKS,
}: ProgressBarProps) {
  const progressPercentage = (linksLength / MAX_LINKS) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>
          Links used: {linksLength}/{MAX_LINKS}
        </span>
        <span
          className={
            progressPercentage === 100 ? "text-red-500" : "text-green-500"
          }
        >
          {progressPercentage === 100
            ? "Limit reached"
            : `${MAX_LINKS - linksLength} remaining`}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
