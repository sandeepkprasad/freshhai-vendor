import React, { useContext, useState, Suspense, lazy } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import DeliveryFilter from "../components/customComponents/DeliveryFilter";
import HeadRow from "../components/customComponents/HeadRow";
import AgentModal from "../components/AgentModal";

const DeliveryRow = lazy(() =>
  import("../components/customComponents/DeliveryRow")
);

const Delivery = () => {
  const {
    isDarkMode,
    handleNotification,
    deliveryPartners,
    isDeliveryAgentModal,
    setIsDeliveryAgentModal,
  } = useContext(adminContext);
  const [selectedAgentData, setSelectedAgentData] = useState(0);

  const handleActiveAgents = () => {
    setSelectedAgentData(0);
    handleNotification(true, "green", "Active Agents Selected");
  };

  const handleInactiveAgents = () => {
    setSelectedAgentData(1);
    handleNotification(true, "green", "Total Agents Selected");
  };

  const handleSuspendedAgents = () => {
    setSelectedAgentData(2);
    handleNotification(true, "green", "Suspended Agents Selected");
  };

  return (
    <>
      <DashboardWrapper>
        <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
          {/** Left Side Part */}
          <div className="w-[80%] h-full flex flex-col justify-between items-center">
            {selectedAgentData === 0 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading="Active Agents" />
                <DeliveryFilter dataType={"active"} />
              </div>
            )}
            {selectedAgentData === 1 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading="Total Agents" />
                <DeliveryFilter dataType={"total"} />
              </div>
            )}
            {selectedAgentData === 2 && (
              <div className="w-full h-fit flex justify-between items-center">
                <Heading heading="Suspended Agents" />
                <DeliveryFilter dataType={"suspended"} />
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
                  "Name",
                  "Mobile",
                  "Vechile",
                  "Vechile No.",
                  "Availability",
                ]}
              />
              {selectedAgentData === 0 && (
                <>
                  {deliveryPartners?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading Active Agents...
                            </p>
                          </div>
                        }
                      >
                        {deliveryPartners?.map((user, index) => (
                          <DeliveryRow
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
                        No Agent Available
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedAgentData === 1 && (
                <>
                  {deliveryPartners?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading Total Agents...
                            </p>
                          </div>
                        }
                      >
                        {deliveryPartners?.map((user, index) => (
                          <DeliveryRow
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
                        No Agent Available
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedAgentData === 2 && (
                <>
                  {deliveryPartners?.length > 0 ? (
                    <div className="w-full h-[95%] overflow-x-hidden overflow-y-scroll customScrollbar">
                      <Suspense
                        fallback={
                          <div className="w-full h-[95%] flex justify-center items-center">
                            <p className="font-semibold text-xl text-neutral-gray-medium">
                              Loading Suspended Agent...
                            </p>
                          </div>
                        }
                      >
                        {deliveryPartners?.map((user, index) => (
                          <DeliveryRow
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
                        No Agent Available
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
              <button
                className="buttonClass bg-primary-blue-dark"
                onClick={() => setIsDeliveryAgentModal(true)}
              >
                Add Delivery Agent
              </button>
            </div>
            <div className="w-full h-[90%] bg-transparent flex flex-col justify-between items-center space-y-[8%]">
              {/** Active Agents */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Active Agents"
                onClick={handleActiveAgents}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Active Agents
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {deliveryPartners?.length} Agents
                </p>
              </div>

              {/** Total Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Inactive Agents"
                onClick={handleInactiveAgents}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Total Agents
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {deliveryPartners?.length} Agents
                </p>
              </div>

              {/** Blocked Users */}
              <div
                className={`w-full h-1/3 ${
                  isDarkMode
                    ? "bg-neutral-black-dark border border-neutral-black-dark"
                    : "bg-neutral-white border"
                } flex flex-col justify-center items-start rounded-3xl shadow-md pl-[15%] pr-[1%] cursor-pointer active:scale-95 duration-300`}
                title="Click for Suspended Agents"
                onClick={handleSuspendedAgents}
              >
                <p className="font-semibold text-[1vw] text-neutral-black-light">
                  Suspended Agents
                </p>
                <p
                  className={`font-semibold text-[2vw] ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {deliveryPartners?.length} Agents
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>

      {isDeliveryAgentModal && <AgentModal />}
    </>
  );
};

export default Delivery;
