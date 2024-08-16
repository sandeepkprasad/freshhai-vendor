import React, { useContext, Suspense, lazy } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";

const TopSellingProductCard = lazy(() =>
  import("../components/TopSellingProductCard")
);

const Dashboard = () => {
  const { isDarkMode, topSellingProducts } = useContext(adminContext);

  return (
    <DashboardWrapper>
      <div className="w-full h-full flex flex-col justify-between items-start pb-[0.5%] space-y-[2%] overflow-hidden">
        <div className="w-full h-[50%] flex justify-center items-center space-x-[2%]">
          <div
            className={`w-[60%] h-full ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } border rounded-3xl shadow-md`}
          ></div>
          <div className="w-[40%] h-full grid grid-cols-2 gap-x-[4%] gap-y-[8%]">
            {[1, 2, 3, 4]?.map((boxData, index) => (
              <div
                className={`w-full h-full ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } border rounded-3xl shadow-md`}
                key={index}
              ></div>
            ))}
          </div>
        </div>
        <div className="w-full h-[50%] flex justify-center items-center space-x-[2%]">
          <div
            className={`w-[60%] h-full ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } border rounded-3xl shadow-md`}
          ></div>
          <div
            className={`w-[40%] h-full ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } flex flex-col justify-between items-center rounded-3xl shadow-md p-[1%]`}
          >
            <div className="w-full h-fit flex justify-between items-center">
              <Heading heading="Top Selling Product" />
              <button
                className={`font-normal text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-light"
                } active:scale-95 duration-300`}
              >
                View All
              </button>
            </div>
            <div
              className={`w-full h-[85%] overflow-x-hidden overflow-y-scroll space-y-[2%] customScrollbar`}
            >
              <Suspense
                fallback={
                  <div className="w-full h-[85%] flex justify-center items-center">
                    <p className="font-semibold text-xl text-neutral-gray-medium">
                      Loading All Products...
                    </p>
                  </div>
                }
              >
                {topSellingProducts?.map((product, index) => (
                  <TopSellingProductCard data={product} key={index} />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
