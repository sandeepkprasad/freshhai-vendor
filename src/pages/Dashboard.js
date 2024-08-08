import React from "react";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between items-center">
          <div className="w-full h-fit flex justify-between items-center">
            <Heading heading="Dashboard" />
            <Heading heading="Overview" />
          </div>
          <div className="w-full h-[90%] flex justify-between items-start">
            <div>ddd</div>
            <div>ccf</div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
