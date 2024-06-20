import React, { useState } from "react";

const TabSwitch = ({ data, tabChange }) => {
  const [selectedTab, setSelectedtab] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedtab(index);
    }, 300);
    tabChange(tab, index);
  };
  return (
    <>
      <div className="switchingTabs text-center">
        <div className="tabItems">
          {data.map((tab, index) => {
            return (
              <span
                key={index}
                className={`tabItem ${selectedTab === index ? "active" : ""}`}
                onClick={() => activeTab(tab, index)}
              >
                {tab}
              </span>
            );
          })}
          <span className="movingBg" style={{ left }} />
        </div>
      </div>
    </>
  );
};

export default TabSwitch;
