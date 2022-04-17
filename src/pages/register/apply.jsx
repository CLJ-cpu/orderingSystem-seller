import React, { useState, useEffect } from "react";
import { NavBar, Form, List, Card, Steps } from "antd-mobile";
import styles from "./index.less";
import { getStore } from "../../services/store";
import { useNavigate } from "react-router-dom";
const { Step } = Steps;

const Index = (props) => {
  const navigate = useNavigate();
  const store_id = window.location.search.substring(10);
  const [step, setStep] = useState(0);
  const [applyInfo, setAppliedInfo] = useState({
    step: 0,
    infoComplete: false,
    qualComplete: false,
  });
  const COMTYPE = [
    { type: true, text: "已录入" },
    { type: false, text: "待录入，去填写" },
  ];
  useEffect(() => {
    //获取当前id店铺信息
    getStore({ _id: store_id }).then((res) => {
      if (res.success) {
        setAppliedInfo(res.store.applyInfo)
      }
    });
  }, []);
  const backToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.apply}>
      <NavBar
        style={{
          "--border-bottom": "2px #eee solid",
        }}
        onBack={backToLogin}
      >
        商家入驻-申请进度
      </NavBar>
      <Card className={styles.stepCard}>
        <Steps
          current={applyInfo?.step}
          style={{
            "--title-font-size": "18px",
          }}
        >
          <Step title="提交资料" />
          <Step title="资料审核" />
          <Step title="开门营业" />
        </Steps>
      </Card>
      {/* <Card> */}
      {step === 0 && (
        <List mode="card" header="只需完成以下步骤，即可申请入驻">
          <List.Item
            extra={
              COMTYPE.find((it) => Boolean(it.type) === applyInfo?.infoComplete)
                ?.text
            }
            onClick={() =>
              navigate("/register/apply/form?store_id=" + store_id)
            }
          >
            店铺信息
          </List.Item>
          <List.Item
            extra={
              COMTYPE.find((it) => Boolean(it.type) === applyInfo?.qualComplete)
                ?.text
            }
            onClick={() => {}}
          >
            资质信息
          </List.Item>
        </List>
      )}
      {step === 1 && 1}
      {step === 2 && 2}
      {/* </Card> */}
    </div>
  );
};
export default Index;
