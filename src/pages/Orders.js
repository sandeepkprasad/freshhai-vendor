import React, { useContext, useState, Suspense, lazy } from "react";
import "../App.css";
import adminContext from "../context/adminContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import OrderFilter from "../components/customComponents/OrderFilter";
import HeadRow from "../components/customComponents/HeadRow";
import OrderModal from "../components/OrderModal";

const OrderRow = lazy(() => import("../components/customComponents/OrderRow"));

const Orders = () => {
  const {
    isDarkMode,
    handleNotification,
    latestOrders,
    allOrders,
    isOrderModal,
  } = useContext(adminContext);
  const [selectedOrderData, setSelectedOrderData] = useState(0);

  const handleLatestOrders = () => {
    setSelectedOrderData(0);
    handleNotification(true, "green", "Latest Orders Selected");
  };

  const handleTodayOrders = () => {
    setSelectedOrderData(1);
    handleNotification(true, "green", "Today's Orders Selected");
  };

  const handleTotalOrders = () => {
    setSelectedOrderData(2);
    handleNotification(true, "green", "Total Orders Selected");
  };

  // Getting Today's Orders
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayOrders = latestOrders?.filter((order) => {
    const orderDate = new Date(order.orderDate);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });

  return (
    <>
      <DashboardWrapper>
        <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Right Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            {selectedOrderData === 0 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading={"Latest Orders"} />
                <OrderFilter dataType={"latest"} />
              </div>
            )}
            {selectedOrderData === 1 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading={"Today's Orders"} />
                <OrderFilter dataType={"today"} />
              </div>
            )}
            {selectedOrderData === 2 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading={"Total Orders"} />
                <OrderFilter dataType={"total"} />
              </div>
            )}
            <div
              className={`w-full h-[90%] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-between items-center rounded-3xl shadow-md p-[1%]`}
            >
              <HeadRow
                rowData={[
                  "Products",
                  "Order Id",
                  "Customer Name",
                  "Amount",
                  "Payment",
                  "Status",
                ]}
              />
              {selectedOrderData === 0 && (
                <>
                  {latestOrders?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading All Orders...
                            </p>
                          </div>
                        }
                      >
                        {latestOrders?.map((order, index) => (
                          <OrderRow
                            data={order}
                            isClickable={true}
                            key={index}
                          />
                        ))}
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No Latest Order Available
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedOrderData === 1 && (
                <>
                  {latestOrders?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading All Orders...
                            </p>
                          </div>
                        }
                      >
                        {latestOrders?.map((order, index) => (
                          <OrderRow
                            data={order}
                            isClickable={false}
                            key={index}
                          />
                        ))}
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No Today's Order Available
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedOrderData === 2 && (
                <>
                  {allOrders?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading All Orders...
                            </p>
                          </div>
                        }
                      >
                        {allOrders?.map((order, index) => (
                          <OrderRow
                            data={order}
                            isClickable={false}
                            key={index}
                          />
                        ))}
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No Total Order Available
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/** Left Side Part */}
          <div className="w-[20%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-end items-center">
              <Heading heading={"Overview"} />
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Latest Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Latest Orders"
                onClick={handleLatestOrders}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Latest Orders
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {latestOrders?.length} Orders
                </p>
              </div>

              {/** Today Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Today's Orders"
                onClick={handleTodayOrders}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Today's Orders
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {todayOrders?.length} Orders
                </p>
              </div>

              {/** Total Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Total Orders"
                onClick={handleTotalOrders}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Total Orders
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {allOrders?.length} Orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isOrderModal && <OrderModal />}
    </>
  );
};

export default Orders;
