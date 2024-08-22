import React, { useEffect, useContext, Suspense, lazy } from "react";
import adminContext from "../context/adminContext";
import { Link, useNavigate } from "react-router-dom";

// Firebase Imports
import { onAuthStateChanged } from "firebase/auth";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import HeadRow from "../components/customComponents/HeadRow";

const TopSellingProductCard = lazy(() =>
  import("../components/TopSellingProductCard")
);
const LatestOrderRow = lazy(() =>
  import("../components/customComponents/LatestOrderRow")
);

const Dashboard = () => {
  const {
    auth,
    setAdminProfile,
    isDarkMode,
    latestOrders,
    topSellingProducts,
  } = useContext(adminContext);
  const navigate = useNavigate();

  // Handling Admin Login State
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminProfile(user);
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [auth, navigate, setAdminProfile]);

  const overviewData = [
    { heading: "Total Value", data: `₹ ${7000}` },
    { heading: "Avg. Order Value", data: `₹ ${7000}` },
    { heading: "Total Orders", data: `${7000}` },
    { heading: "Total Products", data: `${70}` },
  ];

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
            {overviewData?.map((boxData, index) => (
              <div
                className={`w-full h-full ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start border rounded-3xl shadow-md p-[10%]`}
                key={index}
              >
                <p className="font-semibold text-[0.75vw] text-neutral-black-light">
                  {boxData?.heading}
                </p>
                <p
                  className={`font-semibold text-[1.5vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {boxData?.data}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-[50%] flex justify-center items-center space-x-[2%]">
          <div
            className={`w-[60%] h-full ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } flex flex-col justify-between items-center rounded-3xl shadow-md p-[1%]`}
          >
            <div className="w-full h-fit flex justify-between items-center">
              <Heading heading="Latest Orders" />
              <Link
                to="/orders"
                className={`font-normal text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-light"
                } active:scale-95 duration-300`}
              >
                View All
              </Link>
            </div>
            <div className="w-full h-[85%] overflow-hidden">
              <HeadRow
                rowData={["Order Id", "Name", "Price", "Delivery", "Status"]}
              />
              {latestOrders?.length > 0 ? (
                <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                  <Suspense
                    fallback={
                      <div className="w-full h-[95%] flex justify-center items-center">
                        <p className="font-semibold text-xl text-neutral-gray-medium">
                          Loading Latest Orders...
                        </p>
                      </div>
                    }
                  >
                    {latestOrders?.map((order, index) => (
                      <LatestOrderRow data={order} key={index} />
                    ))}
                  </Suspense>
                </div>
              ) : (
                <div className="w-full h-[95%] flex justify-center items-center">
                  <p className="font-semibold text-xl text-neutral-gray-medium">
                    No Order Available
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            className={`w-[40%] h-full ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } flex flex-col justify-between items-center rounded-3xl shadow-md p-[1%]`}
          >
            <div className="w-full h-fit">
              <Heading heading="Top Selling Product" />
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
