import React, { useContext, useState, Suspense, lazy } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import CustomerFilter from "../components/customComponents/CustomerFilter";
import HeadRow from "../components/customComponents/HeadRow";
import UserModal from "../components/UserModal";

const CustomerRow = lazy(() =>
  import("../components/customComponents/CustomerRow")
);

const Customers = () => {
  const { isDarkMode, handleNotification, totalUsers, isUserModal } =
    useContext(adminContext);
  const [selectedCustomerData, setSelectedCustomerData] = useState(0);

  const handleTodayUsers = () => {
    setSelectedCustomerData(0);
    handleNotification(true, "green", "Today's Users Selected");
  };

  const handleTotalUsers = () => {
    setSelectedCustomerData(1);
    handleNotification(true, "green", "Total Users Selected");
  };

  const handleBlockedUsers = () => {
    setSelectedCustomerData(2);
    handleNotification(true, "green", "Blocked Users Selected");
  };

  return (
    <>
      <DashboardWrapper>
        <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            {selectedCustomerData === 0 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading="Today's Users" />
                <CustomerFilter dataType={"today"} />
              </div>
            )}
            {selectedCustomerData === 1 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading="Total Users" />
                <CustomerFilter dataType={"total"} />
              </div>
            )}
            {selectedCustomerData === 2 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading="Blocked Users" />
                <CustomerFilter dataType={"blocked"} />
              </div>
            )}

            <div
              className={`w-full h-[90%] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-between items-center rounded-3xl shadow-md p-[1%]`}
            >
              <HeadRow rowData={["Name", "Number", "Email", "Status"]} />
              {selectedCustomerData === 0 && (
                <>
                  {totalUsers?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading All Users...
                            </p>
                          </div>
                        }
                      >
                        {totalUsers?.map((user, index) => (
                          <CustomerRow
                            data={user}
                            isClickable={false}
                            key={index}
                          />
                        ))}
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No User Available
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedCustomerData === 1 && (
                <>
                  {totalUsers?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading All Users...
                            </p>
                          </div>
                        }
                      >
                        {totalUsers?.map((user, index) => (
                          <CustomerRow
                            data={user}
                            isClickable={true}
                            key={index}
                          />
                        ))}
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No User Available
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedCustomerData === 2 && (
                <>
                  {totalUsers?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading All Users...
                            </p>
                          </div>
                        }
                      >
                        {totalUsers?.map((user, index) => (
                          <CustomerRow
                            data={user}
                            isClickable={true}
                            key={index}
                          />
                        ))}
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-[95%] flex justify-center items-center">
                      <p className="font-semibold text-xl text-neutral-gray-medium">
                        No User Available
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
              {/** Today Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Today's Users"
                onClick={handleTodayUsers}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Today's Users
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {totalUsers?.length} Users
                </p>
              </div>

              {/** Total Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Total Users"
                onClick={handleTotalUsers}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Total Users
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {totalUsers?.length} Orders
                </p>
              </div>

              {/** Blocked Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Blocked Users"
                onClick={handleBlockedUsers}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Blocked Users
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {totalUsers?.length} Orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isUserModal && <UserModal />}
    </>
  );
};

export default Customers;
