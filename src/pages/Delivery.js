import React, { useContext, Suspense, lazy, useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
  const {
    allDeliveryPartners,
    fetchNextDeliveryPartnersPage,
    availablePartnersCount,
    totalPartnersCount,
    inactivePartnersCount,
    addDeliveryPartners,
    isPartnerModal,
  } = useContext(DeliveryContext);
  const { ref, inView } = useInView({
    threshold: 0.5, // 50% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      fetchNextDeliveryPartnersPage();
    }
  }, [inView, fetchNextDeliveryPartnersPage]);

  return (
    <>
      <DashboardWrapper>
        {/** Large Screens */}
        <div className="w-full h-full hidden md:flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            <div className="w-full h-fit flex justify-between items-center">
              <Heading
                heading={`Delivery Agents (${allDeliveryPartners?.length})`}
              />
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
                  "Licence",
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
                  <div className="w-full h-fit flex justify-center items-center py-[1%]">
                    <button
                      className="viewMoreBtn"
                      title="Click to view more"
                      onClick={fetchNextDeliveryPartnersPage}
                    >
                      View more
                    </button>
                  </div>
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
                className="font-normal text-xs hidden"
                onClick={addDeliveryPartners}
              >
                Add Partner
              </button>
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Available partners count */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Available
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {availablePartnersCount}
                </p>
              </div>

              {/** Total partners count */}
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
                  {totalPartnersCount}
                </p>
              </div>

              {/** Inactive partners count */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-lg shadow pl-[15%] pr-[1%]`}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Inactive
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {inactivePartnersCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/** Mobile Screens */}
        <div className="w-full h-full pb-[2%] md:hidden overflow-x-hidden overflow-y-scroll">
          <div className="w-full h-fit grid grid-cols-3 gap-[2%] mb-[5%]">
            {/** Available partners count */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Available
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {availablePartnersCount}
              </p>
            </div>

            {/** Total partners count */}
            <div
              className={`w-full h-10vh ${
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
                {totalPartnersCount}
              </p>
            </div>

            {/** Inactive partners count */}
            <div
              className={`w-full h-[10vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } flex flex-col justify-center items-start rounded-lg shadow pl-[10%] pr-[1%]`}
            >
              <p className="font-semibold text-[3.5vw] text-neutral-black-light">
                Inactive
              </p>
              <p
                className={`font-semibold text-[5vw] ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {inactivePartnersCount}
              </p>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col justify-start items-start space-y-[2%]">
            <Heading
              heading={`Delivery Agents (${allDeliveryPartners?.length})`}
            />
            <DeliveryFilter />
            <div
              className={`w-full h-[57vh] ${
                isDarkMode
                  ? "bg-neutral-black-dark border border-neutral-black-dark"
                  : "bg-neutral-white border"
              } rounded-lg shadow p-[2%]`}
            >
              {allDeliveryPartners?.length > 0 ? (
                <div className="w-full h-full overflow-x-hidden overflow-y-scroll customScrollbar">
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
                    No delivery agent available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isPartnerModal && <ViewDeliveryPartnerModal />}
    </>
  );
};

export default Delivery;
