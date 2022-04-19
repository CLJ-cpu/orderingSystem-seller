export const ORDER_STATUS = [
  { label: "待支付", value: 0 ,color:'#AFEEEE'}, //待支付
  { label: "已下单", value: 1 ,color:'#7FFFAA'}, //卖家需要制作餐品
  { label: "已接单", value: 2 ,color:'	#F4A460'}, //卖家需要制作餐品
  { label: "待取餐", value: 3 ,color:'#fff'}, //卖家做完，待用户取餐
  { label: "已完成", value: 4 ,color:'green'}, //用户取餐完
  { label: "申请取消", value: 5 ,color:'#FF4500'}, //用户申请取消
  { label: "已取消", value: 6 ,color:'#808080'}, //用户未在10分钟内完成支付，或用户申请取消订单后商家同意
];
