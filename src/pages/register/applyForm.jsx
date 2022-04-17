//录入信息
import React, { useState, useEffect } from "react";
import { NavBar, Form, List, Card, Steps, Input, Cascader } from "antd-mobile";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import { getStore } from "../../services/store";
import { TYPE_OPTION, TYPE } from "./constants";
const { Step } = Steps;

const Index = (props) => {
  const store_id = window.location.search.substring(5);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [appliedInfo, setAppliedInfo] = useState();
  const [visible, setVisible] = useState();
  const backToLogin = () => {
    navigate("/login");
  };
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    //获取当前id店铺信息
    getStore({ _id: store_id }).then((res) => {
      if (res.success) {
        setAppliedInfo(res.store.applyInfo)
      }
    });

  },[]);
  const upDateInfo=()=>{

  }
  const STEPS = [
    { step: 0, name: "店铺信息" },
    { step: 1, name: "资质信息" },
    { step: 2, name: "代表人信息" },
  ];
  return (
    <div className={styles.applyForm}>
      <NavBar
        style={{
          "--border-bottom": "2px #eee solid",
        }}
        back="关闭"
        backArrow={false}
        onBack={()=>window.history.back()}
      >
        商家入驻-店铺信息
      </NavBar>
      <div className={styles.title}>
        <strong>
          {STEPS.find((item) => item.step === step).step + 1}
          <span>/3</span>&nbsp;
          {STEPS.find((item) => item.step === step).name}
        </strong>
      </div>
      {/* <Card> */}
      {step === 0 && (
        <Form form={form} layout="horizontal" className={styles.cardForm}>
          <List mode="card">
            <Form.Item label="联系人" name="contacts">
              <Input placeholder="请输入联系人" clearable />
            </Form.Item>
            <Form.Item label="联系电话" name="phoneNumber">
              <Input placeholder="请输入联系电话" clearable type="password" />
            </Form.Item>
          </List>
          <List mode="card">
            <List.Item
              extra={
                TYPE.find(
                  (it) =>
                    it.value === formData?.type || form.getFieldValue("type")
                )?.label
              }
              onClick={() => {
                setVisible(true);
              }}
            >
              经营品类
            </List.Item>
          </List>
        </Form>
      )}
      {step === 1 && 1}
      {step === 2 && 2}
      {/* </Card> */}
      <Cascader
        options={TYPE_OPTION}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        // value={form.getFieldValue("type")}
        onConfirm={(v) => {
          form.setFieldsValue("type", v[1]);
          setFormData({...formData,type:v[1]})
        }}
      />
    </div>
  );
};
export default Index;
