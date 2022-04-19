import React, { useState } from "react";
import { JumboTabs, Tabs, List } from "antd-mobile";
import {
  AppstoreOutline,
  HandPayCircleOutline,
  GiftOutline,
  SearchOutline,
} from "antd-mobile-icons";
import styles from "./index.less";
import Customer from "./tabs/Customer";
import Order from "./tabs/Order";
import Menu from "./tabs/Menu";
const Index = () => {
  
  return (
    <div className={styles.home}>
        <JumboTabs>
          <JumboTabs.Tab
            title={<AppstoreOutline />}
            description="订单"
            key="fruits"
          >
             <Order/>
          </JumboTabs.Tab>
          <JumboTabs.Tab
            title={<GiftOutline />}
            description="商品"
            key="vegetables"
          >
             <Menu/>
          </JumboTabs.Tab>
          <JumboTabs.Tab
            title={<HandPayCircleOutline />}
            description="顾客"
            key="animals"
          />
        </JumboTabs>
      <div className={styles.homeBody}>
        
      </div>
    </div>
  );
};

export default React.memo(Index);
