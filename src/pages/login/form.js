import React, { useState } from "react";
import {
  NavBar,
  Form,
  Input,
  Button,
  Checkbox,
  Toast,
  Modal,
} from "antd-mobile";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import * as user from "../../services/user";
const Index = (props) => {
  const [form] = Form.useForm();
  const [ispasswordLogin, setIsPasswordLogin] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState();
  // const [test,setTest]=useState(1)
  const navigate = useNavigate();
  // useEffect(() => {
  //    let navigate = useNavigate();
  // }, [])
  const loginToHome = () => {
    form.validateFields().then((values) => {
      if (acceptTerms) {
        user.login({ user: values }).then((res) => {
          if (res.success) {
            localStorage.setItem("token", res.token);
            Toast.show({
              duration: 1000,
              icon: "success",
              content: "登录成功",
            });
            setTimeout(() => navigate("/home"), 1000);
          } else {
            Toast.show({
              duration: 1000,
              content: res.errors[0].msg,
            });
          }
        });
      } else {
        Modal.show({
          content: "请选择是否同意条款",
          closeOnAction: true,
          actions: [
            {
              key: "accept",
              text: "同意",
              primary: true,
              onClick: () => setAcceptTerms(true),
            },
            {
              key: "cancel",
              text: "取消",
            },
          ],
        });
      }
    });
  };
  const PasLogin = () => {
    return (
      <Form layout="horizontal" form={form}>
        <Form.Item label="账号" name="username">
          <Input placeholder="请输入手机号/邮箱" clearable />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
        <Button
          style={{
            "--background-color": "	#6495ED",
            "--text-color": "#fff",
            width: "calc(100vw - 40px)",
            height: 50,
            margin: "20px 20px 0",
          }}
          onClick={loginToHome}
        >
          登录
        </Button>
      </Form>
    );
  };
  const PhoLogin = () => {
    return (
      <Form layout="horizontal">
        <Form.Item
          label="手机号"
          extra={
            <div className={styles.extraPart}>
              <a href="" onClick={() => {}}>
                获取验证码
              </a>
            </div>
          }
        >
          <Input placeholder="请输入手机号" clearable />
        </Form.Item>
        <Form.Item label="验证码" name="password">
          <Input placeholder="请输入验证码" clearable type="password" />
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className={styles.home}>
      <NavBar
        back={null}
        right={
          <a
            href=""
            style={{ color: "#6495ED", fontSize: "0.5rem" }}
            onClick={() => navigate("/register")}
          >
            开店
          </a>
        }
        style={{
          "--border-bottom": "2px #eee solid",
        }}
      >
        登录
      </NavBar>
      <div className={styles.content}>
        <div className={styles.login}>
          <span
            className={ispasswordLogin ? styles.active : null}
            onClick={() => setIsPasswordLogin(true)}
          >
            密码登录
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span
            className={ispasswordLogin ? null : styles.active}
            onClick={() => setIsPasswordLogin(false)}
          >
            验证码登录
          </span>
        </div>
        {ispasswordLogin && <PasLogin />}
        {!ispasswordLogin && <PhoLogin />}
        <Button
          style={{
            width: "calc(100vw - 40px)",
            margin: "5px 20px",
          }}
          fill="none"
          size="mini"
        >
          忘记账号和密码
        </Button>
        <div className={styles.footer}>
          <Checkbox
            checked={acceptTerms}
            onChange={(value) => setAcceptTerms(value)}
          />
          &nbsp; 登录代表您已同意
          <a style={{ color: "#6495ED" }}>《食堂商家隐私政策》</a>
        </div>
      </div>
    </div>
  );
};
export default Index;
