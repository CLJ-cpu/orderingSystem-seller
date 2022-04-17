//录入信息
import React, { useState, useEffect } from "react";
import {
  NavBar,
  Form,
  List,
  Input,
  Cascader,
  ImageUploader,
} from "antd-mobile";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import { getStore } from "../../services/store";
import { uploadCommonImage } from "../../services/image";
import { TYPE_OPTION, TYPE } from "./constants";
import querystring from "querystring";
import {
  ImageUpload,
  changeSaveFile,
  changeFileList,
} from "../../component/FileUpload/ImageUpload";

const Index = (props) => {
  const { store_id, step: currentstep } = querystring.parse(
    window.location.search.substr(1)
  );
  const navigate = useNavigate();
  const [step, setStep] = useState(Number(currentstep));
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
        setFormData(res.store.applyInfo);
        form.setFields(res.store.applyInfo);
      }
    });
  }, []);
  const upDateInfo = () => {};
  const imageUpload = (value) => {
    // setFormData({ ...formData,...value})
    console.log(value)
    uploadCommonImage({
      store: store_id,
      files: [
        {
          name:value.name,
          size:value.size,
          filename:value.name,
          originalname:'门脸图'
        },
      ],
    }).then((res) => {});
  };
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
        onBack={() => window.history.back()}
      >
        商家入驻-店铺信息
      </NavBar>
      <div className={styles.title}>
        <strong>
          {STEPS.find((item) => item.step === step)?.step + 1}
          <span>/3</span>&nbsp;
          {STEPS.find((item) => item.step === step)?.name}
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
          <List mode="card">
            <Form.Item label="门脸图" name="outPhoto">
              <ImageUploader
                maxCount={1}
                // value={formData.outPhoto ?? []}
                // onChange={imageUpload}
                upload={imageUpload}
              />
            </Form.Item>
            <Form.Item label="门店名称" name="name">
              <Input placeholder="请输入门店名称" clearable type="password" />
            </Form.Item>
          </List>
          <List mode="card">
            <Form.Item label="店内环境图" name="inPhoto">
            <ImageUpload
              value={[changeSaveFile(formData.inPhoto)]}
              onChange={(fileList) => {
                const attachment = changeFileList(fileList, 0);
                setFormData({...formData, inPhoto:attachment});
              }}
              store={store_id}
            />
            </Form.Item>
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
          setFormData({ ...formData, type: v[1] });
        }}
      />
    </div>
  );
};
export default Index;
