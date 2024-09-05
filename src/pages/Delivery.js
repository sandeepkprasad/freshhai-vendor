import React, { useContext, Suspense, lazy } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { DeliveryContext } from "../context/DeliveryContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import DeliveryFilter from "../components/customComponents/DeliveryFilter";
import HeadRow from "../components/customComponents/HeadRow";
import ViewDeliveryPartnerModal from "../components/ViewDeliveryPartnerModal";

const DeliveryRow = lazy(() =>
  import("../components/customComponents/DeliveryRow")
);

const Delivery = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { allDeliveryPartners, addDeliveryPartners, isPartnerModal } =
    useContext(DeliveryContext);

  return (
    <>
      <DashboardWrapper>
        <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-between items-center">
              <Heading heading="Active Agents" />
              <DeliveryFilter />
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
                  "Mobile",
                  "Vechile",
                  "Vechile No.",
                  "Status",
                  "Availability",
                ]}
              />
              {allDeliveryPartners?.length > 0 ? (
                <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                  <Suspense
                    fallback={
                      <div className="w-full h-[95%] flex justify-center items-center">
                        <p className="font-semibold text-xl text-neutral-gray-medium">
                          Loading all delivery agents...
                        </p>
                      </div>
                    }
                  >
                    {allDeliveryPartners?.map((delivery, index) => (
                      <DeliveryRow
                        data={delivery}
                        isClickable={true}
                        key={index}
                      />
                    ))}
                  </Suspense>
                </div>
              ) : (
                <div className="w-full h-[95%] flex justify-center items-center">
                  <p className="font-semibold text-xl text-neutral-gray-medium">
                    No delivery agent available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/** Right Side Part */}
          <div className="w-[20%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-end items-center">
              <Heading heading={"Overview"} />
              <button
                className="font-normal text-xs"
                onClick={addDeliveryPartners}
              >
                Add Partner
              </button>
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Active Agents */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
                title="Click for Active Agents"
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Active Partners
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {allDeliveryPartners?.length}
                </p>
              </div>

              {/** Total Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
                title="Click for Inactive Agents"
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Total Partners
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {allDeliveryPartners?.length}
                </p>
              </div>

              {/** Blocked Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
                title="Click for Suspended Agents"
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Suspended Partners
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {allDeliveryPartners?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isPartnerModal && <ViewDeliveryPartnerModal />}
    </>
  );
};

export default Delivery;
