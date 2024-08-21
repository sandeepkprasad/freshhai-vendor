import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import ModalWrapper from "./ModalWrapper";

import { newDeliveryPartnersSchema } from "../utils/LocalData";

const AgentModal = () => {
  const { isDarkMode, setIsDeliveryAgentModal, addDeliveryAgent } =
    useContext(adminContext);
  const [agentToAdd, setAgentToAdd] = useState(newDeliveryPartnersSchema);

  const handleDeliveryAgentImgChange = (e) => {
    const fileData = e.target.files[0];
    setAgentToAdd((prevState) => ({
      ...prevState,
      imageUrl: fileData,
    }));
  };

  const handleDeliveryAgentChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const [section, field] = name.split(".");
      setAgentToAdd((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value,
        },
      }));
    } else if (name.startsWith("contact.")) {
      const [section, field] = name.split(".");
      setAgentToAdd((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value,
        },
      }));
    } else {
      setAgentToAdd((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <ModalWrapper closeModal={setIsDeliveryAgentModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <p
            className={`font-semibold text-lg ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            Add a Delivery Agent
          </p>
          <div className="w-full h-fit flex justify-start items-center">
            <input type="file" onChange={handleDeliveryAgentImgChange} />
          </div>
          <div className="w-full h-fit flex justify-start items-center">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={agentToAdd.name}
              onChange={handleDeliveryAgentChange}
              maxLength={25}
              className={`w-[68%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <input
              type="number"
              placeholder="Phone Number"
              name="contact.phone"
              value={agentToAdd.contact.phone}
              onChange={handleDeliveryAgentChange}
              maxLength={10}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="contact.email"
              value={agentToAdd.contact.email}
              onChange={handleDeliveryAgentChange}
              maxLength={50}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <hr />
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <input
              type="text"
              placeholder="Vehicle Number"
              name="vehicle"
              value={agentToAdd.vehicle}
              onChange={handleDeliveryAgentChange}
              maxLength={50}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <input
              type="text"
              placeholder="Licence Number"
              name="licenseNumber"
              value={agentToAdd.licenseNumber}
              onChange={handleDeliveryAgentChange}
              maxLength={50}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <hr />
          <textarea
            placeholder="Enter street here..."
            name="address.street"
            value={agentToAdd.address.street}
            onChange={handleDeliveryAgentChange}
            maxLength={50}
            className={`w-[68%] h-[20%] ${
              isDarkMode ? "textareaClassDark" : "textareaClassLight"
            }`}
          ></textarea>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <input
              type="text"
              placeholder="City"
              name="address.city"
              value={agentToAdd.address.city}
              onChange={handleDeliveryAgentChange}
              maxLength={25}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <input
              type="text"
              placeholder="State"
              name="address.state"
              value={agentToAdd.address.state}
              onChange={handleDeliveryAgentChange}
              maxLength={25}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center">
            <input
              type="number"
              placeholder="PIN Code"
              name="address.zip"
              value={agentToAdd.address.zip}
              onChange={handleDeliveryAgentChange}
              maxLength={6}
              className={`w-[33%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <hr />
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="buttonClass bg-primary-blue-dark"
            onClick={() => addDeliveryAgent(agentToAdd)}
          >
            Save Delivery Agent
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AgentModal;
