import React from 'react';

/**
 * A reusable component for the separator, which includes the vertical line and the equals icon.
 * It's designed to be placed as the middle element in a CSS Grid layout.
 */
const SeparatorIcon: React.FC = () => (
  <div className="relative flex items-center justify-center h-full ">
    {/* Vertical line that spans the full height of its container */}
    <div className="absolute border-l-[1.5px] h-full border-[#992d23]" />
    
    {/* Icon container with a white background to mask the vertical line behind it */}
    <div className="relative z-10 p-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-full  bg-[var(--primary-color)] text-2xl font-light text-white">

        =
      </div>
    </div>
  </div>
);

/**
 * The main component that displays the Military Star Rewards Program details.
 */
const RewardsProgram: React.FC = () => {
  return (
    // Main card container with shadow, rounded corners, and a max-width
    <div className="mx-auto my-10 w-full max-w-lg rounded-lg bg-white font-sans shadow-md">
      
      {/* Header Section */}
      <h2 className="border-y-[1.5px] border-[#992d23] p-5 text-center text-xl font-medium tracking-wide text-[var(--primary-color)]">
        The MILITARY STAR Rewards Program
      </h2>

      {/* Main content area for the reward tiers */}
      <div>
        
        {/* First Reward Tier: $1 spent = 2 points */}
        <div className="grid grid-cols-[1fr_auto_1fr] border-b-[1.5px] border-[#992d23]">
          <div className="p-6 flex items-center justify-center gap-2">
            <p className="text-4xl font-bold text-[var(--primary-color)] flex items-start"><span className='text-lg '>$</span>1</p>
            <p className="mt-1 text-[var(--primary-color)] text-2xl">spent</p>
          </div>
          <SeparatorIcon />
          <div className="p-6 flex items-center justify-center gap-2">
            <p className="text-4xl font-bold text-[var(--primary-color)]">2</p>
            <p className="mt-1 text-[var(--primary-color)] text-2xl">points</p>
          </div>
        </div>

        {/* Second Reward Tier: 2000 points = $20 rewards card */}
        <div className="grid grid-cols-[1fr_auto_1fr] border-b-[1.5px] border-[#992d23]">
          <div className="p-6 text-center">
            <p className="text-4xl font-bold text-[var(--primary-color)]">2000</p>
            <p className="mt-1 text-[var(--primary-color)] text-2xl">points earned</p>
          </div>
          <SeparatorIcon />
          <div className="p-6 text-center">
            <p className="text-4xl font-bold text-[var(--primary-color)] flex items-start"><span className='text-lg '>$</span>20</p>
            <p className="mt-1 text-[var(--primary-color)] text-2xl">rewards card</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RewardsProgram;
          