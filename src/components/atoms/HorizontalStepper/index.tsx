import React from "react";

const HorizontalStepper = () => {
  return (

    <div data-testid="stepper-container" className="min-h-screen bg-[#f3f5f6] flex justify-center items-center">
      <div className="min-h-screen bg-[#f3f5f6] flex justify-center items-center ">
        <div className="w-[700px] ">
          <div className="w-full flex justify-between relative">
            {/* Red intersecting line */}
            <div className="w-full h-[5px] bg-red-500 absolute top-1/2 left-0 -z-10">sdfs</div>

            {/* Step circles */}
            <div className="w-[50px] h-[50px] bg-[#43880f] rounded-full relative">
              <span className="absolute top-[150%] left-[9%] text-[#141d0d]">Step&nbsp;1</span>
              <i className="fa-solid fa-check absolute top-[35%] left-[35%] block"></i>
            </div>
            <div className="w-[50px] h-[50px] bg-white rounded-full relative">
              <span className="absolute top-[150%] left-[9%] text-[#141d0d]">Step&nbsp;2</span>
              <i className="fa-solid fa-check absolute top-[35%] left-[35%] hidden"></i>
            </div>
            <div className="w-[50px] h-[50px] bg-white rounded-full relative">
              <span className="absolute top-[150%] left-[9%] text-[#141d0d]">Step&nbsp;3</span>
              <i className="fa-solid fa-check absolute top-[35%] left-[35%] hidden"></i>
            </div>
            <div className="w-[50px] h-[50px] bg-white rounded-full relative">
              <span className="absolute top-[150%] left-[9%] text-[#141d0d]">Step&nbsp;4</span>
              <i className="fa-solid fa-check absolute top-[35%] left-[35%] hidden"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalStepper;