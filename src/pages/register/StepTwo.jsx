import React, { useState } from "react";
import { NavBar, Form, Input, Button, Checkbox } from "antd-mobile";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";

const Index = (props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState();
  const backToLogin = () => {
    navigate("/login");
  };
  const isPhone = (val) => {
    //验证是否符合手机号格式
    return /^1[3456789]\d{9}$/.test(val);
  };

  return (
   <>
   <h2>验证码已发送至</h2>
   <div>
     <span>
       手机号<span className={styles.baseColor}>{number}</span>，请查收
     </span>
     <a className={styles.baseColor}>重新获取</a>
   </div>
   <Input
     className={styles.input}
     placeholder="输入6位验证码"
     type="number"
     clearable
     onChange={(val) => {
       setNumber(val);
     }}
   />
   <Button
     style={{
       "--background-color": "	#6495ED",
       "--text-color": "#fff",
       width: "calc(100vw - 40px)",
       height: 50,
       margin: "20px 0",
     }}
     onClick={() => {
       setStep(2);
     }}
   >
     下一步
   </Button>
 </>
);
};
export default Index;
