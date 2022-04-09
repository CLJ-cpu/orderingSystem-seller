import React, { useState } from "react";
import { List, NavBar, Modal, Input, Form } from "antd-mobile";
import styles from "../index.less";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const defaultData = {
    storename: "Tobest天冰冰淇淋智选（和香店）",
    type: "甜品冷饮",
    status: "营业状态",
    notice: "Tobest天冰冰淇淋智选店是一家专一、专注、专业只做好冰淇淋啊啊啊啊",
    place: "浙江外国语学院和香园二楼",
    openTime: "08:50-21:25",
  };
  const TITLE = [
    { keyname: "storename", label: "门店名称" },
    { keyname: "type", label: "经营类型" },
  ];
  const [formData, setFormData] = useState(defaultData);
  const showEdit = (key) => {
    console.log(key, formData[key]);
    const data = formData[key];
    Modal.confirm({
      title: "编辑",
      content: (
        <Form layout="vertical">
          <Form.Item
            label={TITLE.find((i) => i.keyname === key).label}
            name={key}
          >
            <Input
              placeholder="请输入"
              value={data}
              defaultData={data}
              onChange={(val) => {
                setFormData({ ...formData, [key]: val });
              }}
            />
          </Form.Item>
        </Form>
      ),
    });
  };
  return (
    <div className={styles.infoList}>
      <NavBar
        onBack={() => window.history.back()}
        style={{
          "--border-bottom": "2px #eee solid",
        }}
      >
        门店设置
      </NavBar>
      <List mode="card">
        <List.Item
          extra={defaultData.storename}
          onClick={() => showEdit("storename")}
        >
          门店名称
        </List.Item>
        <List.Item extra={defaultData.type} onClick={() => showEdit("type")}>
          经营品类
        </List.Item>
        <List.Item extra={"图片"} onClick={() => showEdit("status")}>
          店铺头像
        </List.Item>
      </List>
      <List mode="card">
        <List.Item
          extra={defaultData.status}
          onClick={() => navigate("/personalCenter/storeEdit")}
        >
          营业状态
        </List.Item>
        <List.Item
          extra={defaultData.notice}
          onClick={() => showEdit("status")}
        >
          门店公告
        </List.Item>
        <List.Item extra={defaultData.place} onClick={() => showEdit("status")}>
          店铺地址
        </List.Item>
        <List.Item
          extra={defaultData.openTime}
          onClick={() => showEdit("status")}
        >
          营业时间
        </List.Item>
      </List>
    </div>
  );
};
export default React.memo(Index);
