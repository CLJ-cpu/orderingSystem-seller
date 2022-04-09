import React, { useState } from "react";
import { List, NavBar, Input, Form,Button } from "antd-mobile";
import styles from "../index.less";
const Index = () => {
  const defaultData = {
    storename: "Tobest天冰冰淇淋智选（和香店）",
  };
  const [formData, setFormData] = useState(defaultData);
  return (
    <div>
      <NavBar
        onBack={() => window.history.back()}
        style={{
          "--border-bottom": "2px #eee solid",
        }}
      >
        营业状态
      </NavBar>
      <div>
        <img
          style={{
            display: "block",
            width: "70%",
            margin: "20px 15%",
          }}
          src="/img/icecream.jpeg"
          alt="店铺头像"
        />
        <h3 style={{textAlign: "center"}}>{formData.storename}</h3>
        <div className={styles.status}>
          <div className={styles.top}>
            <h2>
              <i className={styles.light}></i>营业中
            </h2>
            <span>本店目前正常营业中</span>
          </div>
          <div className={styles.bottom}>
          <List >
            <List.Item description={<strong>8:50-21:25</strong>} clickable>
              今日营业时间
            </List.Item>
          </List>
          </div>
        </div>
      <Button style={{width:'80%',margin:'0 10%'}}>停止营业</Button>
      </div>
    </div>
  );
};
export default React.memo(Index);
