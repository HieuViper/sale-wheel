"use client";
import { spinWheel } from "@/actions/spinRecordAction";
import Wheel from "@/components/Wheel";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [userData, setUserData] = useState(null);

  const [couponNum, setCouponNum] = useState(1);
  const [mustSpin, setMustSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resultWinSpin, setResultWinSpin] = useState(null);

  const [showModal, setShowModal] = useState(false);
  console.log("🚀 ~ Home ~ showModal:", showModal);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    router.push("/");
  };

  const onClick = async () => {
    if (!spinning) {
      setLoading(true);
      const resultSpin = await spinWheel(userData);
      setLoading(false);
      if (!resultSpin) {
        alert("Không còn phần thưởng khả dụng!");
      } else {
        setSpinning(true);
        setCouponNum(resultSpin.id - 1);
        console.log(resultSpin);
        setResultWinSpin(resultSpin);
        setMustSpin(true);
        localStorage.removeItem("spinUser");
      }
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("spinUser");
    console.log("🚀 ~ useEffect ~ userData:", userData);

    if (!userData) {
      router.push("/");
    }
    setUserData(JSON.parse(userData));
  }, [router]);
  return (
    <div className="">
      <div className="hidden lg:block text-center p-10">
        <h1 className="text-2xl font-bold">
          Vui lòng truy cập bằng điện thoại hoặc máy tính bảng
        </h1>
        <p className="mt-4 text-gray-600">
          Trang web này không khả dụng trên thiết bị có màn hình lớn.
        </p>
      </div>
      <div
        className=" lg:hidden App bg-cover bg-no-repeat h-dvh flex flex-col justify-between pt-14 pb-32"
        style={{ backgroundImage: "url('./background1.webp')" }}
      >
        <div className="sm:w-[60%] w-[100%] sm:h-[60vw] h-[100vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={couponNum}
            onClick={() => onClick()}
            onStopSpinning={() => {
              setSpinning(false);
              setMustSpin(false);
              openModal();
            }}
          />
        </div>

        {/* Modal */}
        {showModal && resultWinSpin && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 border-4 border-yellow-500 shadow-xl rounded-lg p-6 w-[95%] ">
              <h2 className="text-red-600 text-2xl font-bold text-center">
                🎉 Kết Quả 🎉
              </h2>
              <p className="text-center text-green-600 font-semibold mt-4 text-lg">
                {resultWinSpin.label}
              </p>
              <button
                onClick={closeModal}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium"
              >
                Đóng và Quay Lại Trang Chủ
              </button>
            </div>
          </div>
        )}

        <div className="flex w-full justify-center">
          <Image
            src="/Text2.webp"
            alt=""
            width={250}
            height={200}
            className=""
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-avo font-bold text-center text-[#b6001d]">
            {!resultWinSpin ? (
              <>
                Bạn có <span className="text-2xl">01</span> lượt quay may mắn
              </>
            ) : (
              <div className="pb-10">Hết lượt quay</div>
            )}
          </div>
          {!resultWinSpin && (
            <button
              className={`px-8 pt-1 pb-3 rounded-full bg-[#b6001d] text-[#ffeab9] font-avo font-bold  ${
                loading ? "opacity-60 bg-red-800" : ""
              }`}
              onClick={() => onClick()}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  Đang quay <Loader2Icon className="animate-spin" />
                </div>
              ) : (
                "Quay Ngay"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
