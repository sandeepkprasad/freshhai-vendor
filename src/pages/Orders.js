import React, { useContext, Suspense, lazy } from "react";
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
  const { allOrders, addOrder, isOrderModal } = useContext(OrdersContext);

  return (
    <>
      <DashboardWrapper>
        {/** Large Screens */}
        <div className="w-full h-full hidden md:flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-between items-center">
              <Heading heading={"Latest Orders"} />
              <OrderFilter dataType={"latest"} />
            </div>
            <div
              className={`w-full h-[90%] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-between items-center rounded-lg shadow p-[1%]`}
            >
              <HeadRow
                rowData={[
                  "Customer",
                  "Product",
                  "Total",
                  "Payment",
                  "Delivery",
                  "Status",
                ]}
              />
              {allOrders?.length > 0 ? (
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
                    {allOrders?.map((order, index) => (
                      <OrderRow data={order} isClickable={true} key={index} />
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
            </div>
          </div>

          {/** Right Side Part */}
          <div className="w-[20%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-end items-center">
              <Heading heading={"Overview"} />
              <button className="font-normal text-xs" onClick={addOrder}>
                Add Order
              </button>
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Latest Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
                title="Click for Latest Orders"
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
                  {allOrders?.length}
                </p>
              </div>

              {/** Last Month Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
                title="Click for Last Month Orders"
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
                  {allOrders?.length}
                </p>
              </div>

              {/** Total Orders */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
                title="Click for Total Orders"
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

        {/** Mobile Screens */}
        <div className="w-full h-full pb-[2%] md:hidden overflow-x-hidden overflow-y-scroll">
          <div className="w-full h-fit grid grid-cols-3 gap-[2%] mb-[5%]">
            {/** Latest Orders */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
              title="Click for Latest Orders"
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Latest Orders
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {allOrders?.length}
              </p>
            </div>

            {/** Last Month Orders */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
              title="Click for Last Month Orders"
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Last Month Orders
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {allOrders?.length}
              </p>
            </div>

            {/** Total Orders */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
              title="Click for Total Orders"
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Total Orders
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {allOrders?.length}
              </p>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col justify-start items-start space-y-[2%]">
            <Heading heading={"Latest Orders"} />
            <OrderFilter />
            <div
              className={`w-full h-[60vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-between items-center rounded-lg shadow p-[1%]`}
            >
              <HeadRow
                rowData={[
                  "Customer",
                  "Product",
                  "Total",
                  "Payment",
                  "Delivery",
                  "Status",
                ]}
              />
              {allOrders?.length > 0 ? (
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
                    {allOrders?.map((order, index) => (
                      <OrderRow data={order} isClickable={true} key={index} />
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
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isOrderModal && <OrderModal />}
    </>
  );
};

export default Orders;
