import React, { useState } from "react";
import { Tabs, Button, List, Image, Modal } from "antd-mobile";
import styles from "../index.less";
import { ORDER_STATUS } from "../constants";
import { PhoneFill } from "antd-mobile-icons";
const Index = () => {
  const [inAllList, setInAllList] = useState(true);
  const [ordersList, setOrderList] = useState([
    {
      no: 1,
      status: 1,
      orderer: { name: "陈璐静", phone: "13600620725" },
      orderTime: "2022-04-17 19:00:00",
      remark: "多放辣椒和沙拉酱！！",
      completeTime: "2022-04-17 19:12:00",
      dishes: [
        {
          name: "海带丝",
          price: "0",
          number: "1",
          image: { src: "img/hds.jpeg" },
        },
        {
          name: "黑椒土豆粉",
          price: "0",
          number: "1",
          image: { src: "img/tdf.jpeg" },
        },
        {
          name: "小青菜",
          price: "0",
          number: "1",
          image: { src: "img/qc.jpeg" },
        },
        {
          name: "双拼饭",
          price: "15",
          number: "1",
          image: { src: "img/spf.jpeg" },
        },
      ],
    },
    {
      no: 2,
      status: 0,
      orderer: { name: "chen", phone: "13600624564" },
      orderTime: "2022-04-17 19:05:00",
      // completeTime: "2022-04-17 19:12:00",
    },
    {
      no: 3,
      status: 5,
      orderer: { name: "小陈", phone: "18888912516" },
      orderTime: "2022-04-17 19:05:00",
      // completeTime: "2022-04-17 19:12:00",
    },
  ]);
  const listTab = [
    { title: "全部订单", key: "all", inall: true },
    { title: "已取消", key: "cancel", inall: false },
  ];
  const renderTab = () => {
    let list = ordersList;
    if (!inAllList) {
      list = ordersList.filter((item) => item.status === 6);
    }
    return list.map((item) => {
      return <OneOreder item={item} key={item.no} />;
    });
  };
  const OneOreder = ({ item } = props) => {
    const [expand, setExpand] = useState(true);
    const status = ORDER_STATUS.find((i) => i.value === item.status);
    const MethodButton = () => {
      const order = () => {
        //接单，修改状态为已接单(后端操作)
        const list = [];
        ordersList.forEach((i) => {
          if (i.no === item.no) list.push({ ...i, status: 2 });
          else list.push({ ...i });
        });
        setOrderList(list);
      };
      const made = () => {
        //修改状态为待取餐(后端操作)
        const list = [];
        ordersList.forEach((i) => {
          if (i.no === item.no) list.push({ ...i, status: 3 });
          else list.push({ ...i });
        });
        setOrderList(list);
        //通知顾客取餐(待添加)
      };
      const complete = () => {
        //修改状态为已完成(后端操作)
        const list = [];
        ordersList.forEach((i) => {
          if (i.no === item.no) list.push({ ...i, status: 4 });
          else list.push({ ...i });
        });
        setOrderList(list);
      };
      const cancelapply = () => {
        const list = [];
        Modal.confirm({
          content: "是否通过该取消申请",
          confirmText: "通过",
          cancelText: "拒绝",
          onConfirm: async () => {
            ordersList.forEach((i) => {
              if (i.no === item.no) list.push({ ...i, status: 6 });
              else list.push({ ...i });
            });
            setOrderList(list);
          },
          onCancel: () => {
            ordersList.forEach((i) => {
              if (i.no === item.no) list.push({ ...i, status: 2 });
              else list.push({ ...i });
            });
            setOrderList(list);
          },
        });
      };
      if (item.status === 1) return <Button onClick={order}>接单</Button>;
      if (item.status === 2) return <Button onClick={made}>制作完成</Button>;
      if (item.status === 3)
        return <Button onClick={complete}>完成订单</Button>;
      if (item.status === 5)
        return <Button onClick={cancelapply}>操作请求</Button>;
      else return <></>;
    };
    return (
      <div
        className={styles.oneLine + " " + (expand ? styles.expand : null)}
        key={item.no}
      >
        <div className={styles.order}>
          <h1>#{item.no}</h1>
          <span>下单时间：{item.orderTime}</span>
          <h2 style={{ color: status.color }}>{status.label}</h2>
        </div>
        <div className={styles.orderer}>
          <strong>
            {item.orderer.name.split("")[0]}同学&nbsp; 手机尾号
            {item.orderer.phone.substr(7, 11)}&nbsp;&nbsp;
            <a href={`tel:${item.orderer.phone}`}>
              <PhoneFill />
            </a>
          </strong>
          {expand ? (
            <div className={styles.orderDetailExpand}>
              <div className={styles.detail}>
                <List header="订单详情：">
                  {item?.dishes?.map((it, index) => {
                    return (
                      <List.Item
                        key={index}
                        prefix={
                          <Image
                            src={it?.image?.src}
                            style={{ borderRadius: 5 }}
                            fit="cover"
                            width={40}
                            height={40}
                          />
                        }
                        extra={"x" + it.number}
                      >
                        &nbsp;{it.name}
                      </List.Item>
                    );
                  })}
                </List>
              </div>
              <MethodButton />
              <Button onClick={() => setExpand(false)}>收起</Button>
            </div>
          ) : (
            <>
              <div className={styles.orderDetail}>
                <span>
                  订单详情：
                  {item?.dishes?.map((it, index) => {
                    if (index < 3)
                      return (
                        <div key={index}>
                          {it.name}&nbsp;----{it.number}份
                        </div>
                      );
                    if (index === 3) return <div key={index}>... ...</div>;
                    else return;
                  })}
                </span>
              </div>
              <MethodButton />
              <Button onClick={() => setExpand(true)}>部分退款</Button>
              <Button onClick={() => setExpand(true)}>展开</Button>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.homeOrder}>
      <Tabs onChange={(key) => setInAllList(key === "all")}>
        {listTab.map((item) => {
          return (
            <Tabs.Tab title={item.title} key={item.key}>
              <span>今日&nbsp;共1单，已取消0单</span>
              {renderTab()}
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default React.memo(Index);
