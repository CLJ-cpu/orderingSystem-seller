import React from "react";
import { List, Button } from "antd-mobile";
import {
  UnorderedListOutline,
  PayCircleOutline,
  DownOutline,
  BellOutline,
  HistogramOutline,
  StopOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import styles from "./index.less";
const Index = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
       navigate("/login");
    }, 1000); 
  };
  return (
    <div className={styles.indexPage}>
      <div className={styles.header}>
        <h2>
          Tobest天并冰淇淋&nbsp;&nbsp;
          <Button fill="none">
            <DownOutline />
          </Button>
        </h2>
        <Button className={styles.headerButton}>预览</Button>
      </div>
      <List>
        <List.Item prefix={<UnorderedListOutline />} onClick={() => {navigate("/personalCenter/store");}}>
          门店设置
        </List.Item>
        <List.Item prefix={<PayCircleOutline />} onClick={() => {}}>
          订单设置
        </List.Item>
        <List.Item prefix={<BellOutline />} onClick={() => {}}>
          消息和铃声设置
        </List.Item>
        <List.Item prefix={<HistogramOutline />} onClick={() => {}}>
          查看报表
        </List.Item>
        <List.Item prefix={<StopOutline />} onClick={logout}>
          退出登录
        </List.Item>
      </List>
    </div>
  );
};
export default React.memo(Index)