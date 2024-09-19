import React, { useContext, Suspense, lazy, useEffect } from "react";
import "../App.css";
import { useInView } from "react-intersection-observer";
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
  const {
    allOrders,
    recentOrders,
    latestOrdersCount,
    lastMonthOrdersCount,
    totalOrdersCount,
    addOrder,
    fetchNextPage,
    fetchNextRecentPage,
    isOrderModal,
    ordersSwitch,
  } = useContext(OrdersContext);
  const { ref, inView } = useInView({
    threshold: 0.5, // 50% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const OrdersList = ({ orders, loadingMessage, fetchNextPage }) => (
    <>
      {orders?.length > 0 ? (
        <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <Suspense
            fallback={
              <div className="w-full h-[95%] flex justify-center items-center">
                <p className="font-semibold text-xl text-neutral-gray-medium">
                  {loadingMessage}
                </p>
              </div>
            }
          >
            {orders?.map((order, index) => (
              <OrderRow data={order} isClickable={true} key={index} />
            ))}
          </Suspense>
          <div className="w-full h-fit flex justify-center items-center py-[1%]">
            <button
              className="viewMoreBtn"
              title="Click to view more"
              onClick={fetchNextPage}
            >
              View more
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-[95%] flex justify-center items-center">
          <p className="font-semibold text-xl text-neutral-gray-medium">
            No orders available
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      <DashboardWrapper>
        {/** Large Screens */}
        <div className="w-full h-full hidden md:flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-between items-center">
              {ordersSwitch ? (
                <Heading heading={`Recent Orders (${recentOrders?.length})`} />
              ) : (
                <Heading heading={`All Orders (${allOrders?.length})`} />
              )}
              <OrderFilter />
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
                  "Name",
                  "Product",
                  "Total",
                  "Payment",
                  "Delivery",
                  "Status",
                ]}
              />
              {ordersSwitch ? (
                <OrdersList
                  orders={recentOrders}
                  loadingMessage="Loading recent orders..."
                  fetchNextPage={fetchNextRecentPage}
                />
              ) : (
                <OrdersList
                  orders={allOrders}
                  loadingMessage="Loading all orders..."
                  fetchNextPage={fetchNextPage}
                />
              )}
            </div>
          </div>

          {/** Right Side Part */}
          <div className="w-[20%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-end items-center">
              <Heading heading={"Overview"} />
              <button className="font-normal text-xs hidden" onClick={addOrder}>
                Add Order
              </button>
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Current month's orders count */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Latest
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {latestOrdersCount}
                </p>
              </div>

              {/** Last month's orders count */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Last Month
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {lastMonthOrdersCount}
                </p>
              </div>

              {/** Total orders count */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Total
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {totalOrdersCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/** Mobile Screens */}
        <div className="w-full h-full pb-[2%] md:hidden overflow-x-hidden overflow-y-scroll">
          <div className="w-full h-fit grid grid-cols-3 gap-[2%] mb-[5%]">
            {/** Current month's orders count */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Latest
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {latestOrdersCount}
              </p>
            </div>

            {/** Last month's orders count */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Last Month
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {lastMonthOrdersCount}
              </p>
            </div>

            {/** Total orders count */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Total
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {totalOrdersCount}
              </p>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col justify-start items-start space-y-[2%]">
            {ordersSwitch ? (
              <Heading heading={`Recent Orders (${recentOrders?.length})`} />
            ) : (
              <Heading heading={`All Orders (${allOrders?.length})`} />
            )}
            <OrderFilter />
            <div
              className={`w-full h-[57vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } rounded-lg shadow p-[2%]`}
            >
              {ordersSwitch ? (
                <>
                  {recentOrders?.length > 0 ? (
                    <div className="w-full h-full overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading recent orders...
                            </p>
                          </div>
                        }
                      >
                        {recentOrders?.map((order, index) => (
                          <OrderRow
                            data={order}
                            isClickable={true}
                            key={index}
                          />
                        ))}
                      </Suspense>
                      <div
                        ref={ref}
                        className="w-full h-[10vh] flex justify-center items-center"
                      >
                        {inView ? (
                          <p className="font-semibold text-sm text-neutral-black-light">
                            Loading more...
                          </p>
                        ) : (
                          <p className="font-semibold text-sm text-neutral-black-light">
                            Scroll to load more
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No recent order available
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {allOrders?.length > 0 ? (
                    <div className="w-full h-full overflow-x-hidden overflow-y-scroll customScrollbar">
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
                            isClickable={true}
                            key={index}
                          />
                        ))}
                      </Suspense>
                      <div
                        ref={ref}
                        className="w-full h-[10vh] flex justify-center items-center"
                      >
                        {inView ? (
                          <p className="font-semibold text-sm text-neutral-black-light">
                            Loading more...
                          </p>
                        ) : (
                          <p className="font-semibold text-sm text-neutral-black-light">
                            Scroll to load more
                          </p>
                        )}
                      </div>
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
        </div>
      </DashboardWrapper>

      {isOrderModal && <OrderModal />}
    </>
  );
};

export default Orders;
