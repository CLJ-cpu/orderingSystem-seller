import React, { useState } from "react";
import { NavBar, Form, List, Card, Steps } from "antd-mobile";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
const { Step } = Steps;

const Index = (props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [number, setNumber] = useState();
  const backToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.apply}>
      <NavBar
        style={{
          "--border-bottom": "2px #eee solid",
        }}
        onBack={() => window.history.back()}
      >
        商家入驻-申请进度
      </NavBar>
      <Card className={styles.stepCard}>
        <Steps
          current={step}
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
          <List.Item extra="已录入" onClick={() => {}}>
            店铺信息
          </List.Item>
          <List.Item extra="待录入，去填写" onClick={() => {}}>
            资质信息
          </List.Item>
          <List.Item extra="未录入" onClick={() => {}}>
            代表人信息
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
