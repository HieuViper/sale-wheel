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
      if (!resultSpin || resultSpin.error) {
        alert(resultSpin.error || "Something went wrong");
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
        className=" lg:hidden bg-cover bg-no-repeat min-h-dvh flex flex-col justify-between pt-6 pb-16"
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
            <div
              className="w-[90%] bg-contain bg-no-repeat min-h-[200px] flex flex-col  items-center"
              style={{ backgroundImage: "url('./bg-popup.webp')" }}
            >
              <div className="h-[64px]"></div>
              <div className="font-avo font-bold text-[#7d0104] text-2xl">
                {resultWinSpin.label}
              </div>
              <button
                onClick={closeModal}
                className="mt-4 w-fit bg-[#7d0104] text-[#fef783] py-2 px-6 rounded-full font-medium"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}

        <div className="flex w-full justify-center">
          <Image
            src="/Text2.webp"
            alt=""
            width={200}
            height={150}
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
