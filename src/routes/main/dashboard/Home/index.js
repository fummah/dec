import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import {Col, Row,Tabs} from "antd";
import HomeTab from "./Tabs/HomeTab";
import CashFlowTab from "./Tabs/CashFlowTab";
import Auxiliary from "util/Auxiliary";

const TabPane = Tabs.TabPane;

const Home = () => {
  const location = useLocation();

  // Default tab key
  const [activeKey, setActiveKey] = useState("1");

  // Update tab key from location state
  useEffect(() => {
    if (location.state && location.state.tabKey) {
      setActiveKey(location.state.tabKey);
    }
  }, [location.state]);

  return (
    <Auxiliary>
       <Row>
       <Col span={24}>
       <Tabs className='gx-tabs-left' activeKey={activeKey}
       onChange={(key) => setActiveKey(key)}>
          <TabPane tab="Home" key="1">
            <div className="gx-mb-2">
             <HomeTab/>
            </div>
          </TabPane>
          <TabPane tab="Cash Flow" key="2">
            <div className="gx-mb-2">
            <CashFlowTab/>
            </div>
          </TabPane>
       
        </Tabs>
       </Col>
       </Row>

    </Auxiliary>
  );
};

export default Home;
