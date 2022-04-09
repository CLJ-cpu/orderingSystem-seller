import React, { useState } from "react";
import { NavBar, Form, Input, Button, Checkbox, Toast } from "antd-mobile";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import * as user from '../../services/user'
const Index = (props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState();
  const [formData,setFormData]=useState({});
  const backToLogin = () => {
    navigate("/login");
  };
  const isPhone = (val) => {
    //验证是否符合手机号格式
    return /^1[3456789]\d{9}$/.test(val);
  };
  console.log(formData);
  const checkUser=() => {
    if(number==='111111'){
      //验证码正确
      if(true){
        //该手机号还未注册过,去设置密码
        setStep(3);
        setNumber();
      }else if(true){
        //已经注册,但未绑定店铺信息，去设置店铺信息
        setStep(4);
      }else{
        //显示已经注册过
      }
    }else{
      Toast.show({
        content:'验证码错误',
      })
    }
  }
  const register=()=>{
    setFormData({...formData,password:number})
    setStep(4);
  }
  return (
    <div className={styles.register}>
      <NavBar
        style={{
          "--border-bottom": "2px #eee solid",
        }}
        onBack={backToLogin}
      >
        商家注册｜商家中心
      </NavBar>
        <div className={styles.content}>
          {step === 1 && (
            <>
              <h2>手机号注册</h2>
              <Input
                className={styles.input}
                placeholder="请输入手机号"
                type="number"
                clearable
                value={number}
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
                  margin: " 20px 0",
                }}
                onClick={() => {
                  setFormData({...formData,phone:number})
                  setStep(2);
                  setNumber();
                }}
                disabled={!isPhone(number)}
              >
                下一步
              </Button>
              <span>
                已有账号，去
                <a style={{ color: "#6495ED" }} onClick={backToLogin}>
                  登录
                </a>
                &gt;
              </span>
            </>
          )}
          {step === 2 && (
              <>
              <h2>验证码已发送至</h2>
              <div>
                <span>
                  手机号<span className={styles.baseColor}>{formData.phone}</span>，请查收
                </span>
                <a className={styles.baseColor}>重新获取</a>
              </div>
              <Input
                className={styles.input}
                placeholder="输入6位验证码"
                type="number"
                clearable
                value={number}
                onChange={(num) => {setNumber(num)}}
              />
              <Button
                style={{
                  "--background-color": "	#6495ED",
                  "--text-color": "#fff",
                  width: "calc(100vw - 40px)",
                  height: 50,
                  margin: "20px 0",
                }}
                onClick={checkUser}
              >
                下一步
              </Button>
            </>      
          )}
          {step === 3 && (
              <>
              <h2>请设置密码</h2>
              <Input
                className={styles.input}
                placeholder="输入6位及以上密码"
                type="password"
                clearable
                value={number}
                onChange={(num) => {setNumber(num)}}
              />
              <Button
                style={{
                  "--background-color": "	#6495ED",
                  "--text-color": "#fff",
                  width: "calc(100vw - 40px)",
                  height: 50,
                  margin: "20px 0",
                }}
                onClick={register}
              >
                下一步
              </Button>
            </>      
          )}
        </div>
    </div>
  );
};
export default Index;
