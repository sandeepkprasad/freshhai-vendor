import React, { useContext, useState, Suspense, lazy } from "react";
import "../App.css";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import OrderFilter from "../components/customComponents/OrderFilter";
import HeadRow from "../components/customComponents/HeadRow";
import OrderModal from "../components/OrderModal";

const OrderRow = lazy(() => import("../components/customComponents/OrderRow"));

const Orders = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { latestOrders, allOrders, isOrderModal } = useContext(OrdersContext);
  const [selectedOrderData, setSelectedOrderData] = useState(0);

  const handleLatestOrders = () => {
    setSelectedOrderData(0);
  };

  const handleTodayOrders = () => {
    setSelectedOrderData(1);
  };

  const handleTotalOrders = () => {
    setSelectedOrderData(2);
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
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            {selectedOrderData === 0 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading={"Latest Orders"} />
                <OrderFilter dataType={"latest"} />
              </div>
            )}
            {selectedOrderData === 1 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading={"Last Month Orders"} />
                <OrderFilter dataType={"month"} />
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
                  "Order Id",
                  "Product",
                  "Price",
                  "Payment",
                  "Delivery",
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
                              Loading latest orders...
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
                        No order available
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
                              Loading last month orders...
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
                        No order available
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
                              Loading all orders...
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
                        No order available
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/** Right Side Part */}
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
                  {latestOrders?.length}
                </p>
              </div>

              {/** Last Month Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Last Month Orders"
                onClick={handleTodayOrders}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Last Month Orders
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {todayOrders?.length}
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
                  {allOrders?.length}
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
