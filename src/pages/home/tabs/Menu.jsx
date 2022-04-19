import React, { useState, useEffect, useRef } from "react";
import { Tabs, SideBar } from "antd-mobile";
import styles from "../index.less";
import smoothscroll from "smoothscroll-polyfill";
import { uniqBy } from "lodash";
const Index = () => {
  const refList = useRef([]);
  const tabs = [
    { key: "1", title: "热销🔥" },
    { key: "2", title: "素菜三个" },
    { key: "3", title: "卤烤套餐" },
    { key: "4", title: "轻食餐" },
    { key: "5", title: "另加🥱" },
    { key: "6", title: "单加沙拉汁" },
    { key: "7", title: "轻食餐土豆粉" },
  ];
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const TabMenu = ({ item, keynumber }) => {
    const refList = useRef();
    useEffect(() => {
       console.log(refList.current.onscroll)
       refList.current.onscroll=()=>{
          console.log(1)
       }
       console.log(refList)
    },[refList]);
    
    return (
      <div id={keynumber+1} ref={refList}>
        <h1>{item.title}start</h1>
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <h1>4</h1>
        <h1>5</h1>
        <h1>6</h1>
        <h1>{item.title}end</h1>
      </div>
    );
  };
  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };
  return (
    <div className={styles.menu}>
      <Tabs>
        <Tabs.Tab title="全部" key="fruits" />
        <Tabs.Tab title="售卖中" key="vegetables" />
        <Tabs.Tab title="已售罄" key="animals" />
      </Tabs>
      <div className={styles.menuBody}>
        <div className={styles.side}>
          <SideBar
            style={{ "--width": "120px" }}
            onChange={(key) => scrollToAnchor(key)}
          >
            {tabs.map((item) => (
              <SideBar.Item key={item.key} title={item.title} />
            ))}
          </SideBar>
        </div>
        <div className={styles.content}>
          {tabs.map((item, index) => (
            <TabMenu key={index} item={item} keynumber={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Index);
