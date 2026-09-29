export function LeafMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22.5 6.5C12 10.5 8.5 22 14 34.5C15.2 28 17.8 21.5 22.5 16.5C20.5 22.8 19.8 29.5 22 38C30.5 29.5 34 18 22.5 6.5Z"
        fill="#1B7A4A"
      />
      <path
        d="M25.5 7C36.5 11.5 40 23 35 35.5C33.5 28.5 31 22 26.5 17C28.8 23.5 29.2 30.2 27 38.5C19.2 30 16.5 18.5 25.5 7Z"
        fill="#2E9A5C"
      />
      <path
        d="M26 24C30.5 27.5 37 30.5 41 39C33.5 36.5 27.5 33 24.5 27.5C25.2 30.5 26.5 34 29 39.5C22 36 18.5 29.5 26 24Z"
        fill="#C4A035"
      />
    </svg>
  );
}

export function Logo({
  size = 42,
  stacked = false,
  slogan = true,
  light = false,
}: {
  size?: number;
  stacked?: boolean;
  slogan?: boolean;
  light?: boolean;
}) {
  return (
    <div className={stacked ? "flex flex-col items-center text-center" : "flex items-center gap-2.5"}>
      <LeafMark size={size} />
      <div className={stacked ? "mt-1" : ""}>
        <div
          className={`font-bold leading-tight tracking-tight ${
            stacked ? "text-[22px]" : "text-[16px]"
          } ${light ? "text-white" : "text-[#1B7A4A]"}`}
        >
          FoodBusiness
        </div>
        {slogan && (
          <div
            className={`leading-tight ${stacked ? "text-[12px] mt-0.5" : "text-[10px]"} ${
              light ? "text-white/80" : "text-gray-500"
            }`}
          >
            Des repas pour votre entreprise
          </div>
        )}
      </div>
    </div>
  );
}
