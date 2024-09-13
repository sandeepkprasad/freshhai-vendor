import React, { useContext, Suspense, lazy } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { UsersContext } from "../context/UsersContext";

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
  const { isDarkMode } = useContext(ProductsContext);
  const {
    allUsers,
    activeUsersCount,
    totalUsersCount,
    blockedUsersCount,
    isUserModal,
    addUser,
  } = useContext(UsersContext);

  return (
    <>
      <DashboardWrapper>
        {/** Large Screens */}
        <div className="w-full h-full hidden md:flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-between items-center">
              <Heading heading="All Users" />
              <CustomerFilter />
            </div>

            <div
              className={`w-full h-[90%] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-between items-center rounded-lg shadow p-[1%]`}
            >
              <HeadRow rowData={["Name", "Contact", "Email", "Postal Code"]} />
              {allUsers?.length > 0 ? (
                <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                  <Suspense
                    fallback={
                      <div className="w-full h-[95%] flex justify-center items-center">
                        <p className="font-semibold text-xl text-neutral-gray-medium">
                          Loading all users...
                        </p>
                      </div>
                    }
                  >
                    {allUsers?.map((user, index) => (
                      <CustomerRow data={user} isClickable={true} key={index} />
                    ))}
                  </Suspense>
                </div>
              ) : (
                <div className="w-full h-[95%] flex justify-center items-center">
                  <p className="font-semibold text-xl text-neutral-gray-medium">
                    No user available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/** Right Side Part */}
          <div className="w-[20%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-end items-center">
              <Heading heading={"Overview"} />
              <button className="font-normal text-xs hidden" onClick={addUser}>
                Add User
              </button>
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Recent Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Active
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {activeUsersCount}
                </p>
              </div>

              {/** Total users count */}
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
                  {totalUsersCount}
                </p>
              </div>

              {/** Blocked users count */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Blocked
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {blockedUsersCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/** Mobile Screens */}
        <div className="w-full h-full pb-[2%] md:hidden overflow-x-hidden overflow-y-scroll">
          <div className="w-full h-fit grid grid-cols-3 gap-[2%] mb-[5%]">
            {/** Recent Users */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Active
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {activeUsersCount}
              </p>
            </div>

            {/** Total users count */}
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
                {totalUsersCount}
              </p>
            </div>

            {/** Blocked users count */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Blocked
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {blockedUsersCount}
              </p>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col justify-start items-start space-y-[2%]">
            <Heading heading="All Users" />
            <CustomerFilter />
            <div
              className={`w-full h-[60vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-between items-center rounded-lg shadow p-[1%]`}
            >
              <HeadRow rowData={["Name", "Contact", "Email", "Postal Code"]} />
              {allUsers?.length > 0 ? (
                <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                  <Suspense
                    fallback={
                      <div className="w-full h-[95%] flex justify-center items-center">
                        <p className="font-semibold text-xl text-neutral-gray-medium">
                          Loading all users...
                        </p>
                      </div>
                    }
                  >
                    {allUsers?.map((user, index) => (
                      <CustomerRow data={user} isClickable={true} key={index} />
                    ))}
                  </Suspense>
                </div>
              ) : (
                <div className="w-full h-[95%] flex justify-center items-center">
                  <p className="font-semibold text-xl text-neutral-gray-medium">
                    No user available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isUserModal && <UserModal />}
    </>
  );
};

export default Customers;
