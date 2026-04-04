import React from "react";

const Loader = () => {
  const styles = `
    @keyframes spinOuter {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(0.85); }
      100% { transform: rotate(360deg) scale(1); }
    }

    @keyframes spinInner {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(-180deg) scale(0.9); }
      100% { transform: rotate(-360deg) scale(1); }
    }
  `;

  return (
    <>
      {/* PRE-INJECT STYLES → loads before render → no lag */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="relative flex items-center justify-center">

          {/* Outer Circle */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-transparent 
                       border-t-cyan-400 border-b-indigo-500 rounded-full"
            style={{
              animation: "spinOuter 1.4s linear infinite",
              willChange: "transform",
            }}
          ></div>

          {/* Inner Circle */}
          <div
            className="absolute w-16 h-16 sm:w-16 sm:h-16 border-4 border-transparent 
                       border-t-indigo-500 border-b-cyan-400 rounded-full"
            style={{
              animation: "spinInner 1s linear infinite",
              willChange: "transform",
            }}
          ></div>

        </div>
      </div>
    </>
  );
};

export default Loader;