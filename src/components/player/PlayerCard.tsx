import Image from "next/image";

export default function ProfileCard({
  name,
  loading,
}: {
  name: string;
  loading: boolean;
}) {
  const followerCount = 0; // TODO integrate once API available
  const followingCount = 0; // TODO integrate once API available
  return (
    <div className="bg-gradient-to-b from-[#0F0B23] to-[#2B2647] m-auto flex flex-col items-center justify-between rounded-[113px] gap-5 py-10 w-[216px]">
      <div className="p-2 bg-[#0404043B] rounded-full">
        <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-b from-[#7940D7] to-[#2D09A3] flex items-center justify-center p-1 group">
          <div className="w-full h-full bg-black rounded-full flex justify-center overflow-hidden relative">
            <Image
              src="/assets/player.webp"
              alt={name || "avatar"}
              fill
              sizes="140px"
              className="object-cover object-center rounded-full"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="text-center">
          <p className="text-[36px] font-bold">{followerCount}</p>
          <p className="text-[14px] text-gray-400">Followers</p>
        </div>
        <div className="bg-gradient-to-b from-[#3D167C] to-[#3705DC] w-0.5 h-full" />
        <div className="text-center">
          <p className="text-[36px] font-bold">{followingCount}</p>
          <p className="text-[14px] text-white opacity-50">Followings</p>
        </div>
      </div>
      <div className="h-[50px]">
        <button
          disabled
          className="rounded-full flex items-center justify-center h-[50px] w-[130px] bg-[#3705DC] text-white opacity-50 cursor-not-allowed"
        >
          {loading ? "Loading" : "+ Follow"}
        </button>
      </div>
    </div>
  );
}