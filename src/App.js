import './App.css';
import React, { useEffect,useState } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import {
   AppOutline,
   MessageOutline,
   MessageFill,
   UnorderedListOutline,
   UserOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
function App(props) {
  const [activityKey, setActivityKey] = useState('home')
   const navigate = useNavigate()
   const tabs = [{
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
   },
   {
      key: 'todo',
      title: '我的待办',
      icon: <UnorderedListOutline />,
      badge: '5',
   },
   {
      key: 'message',
      title: '我的消息',
      icon: (active) =>
         active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
   },
   {
      key: 'personalCenter',
      title: '个人中心',
      icon: <UserOutline />,
   },
   ]
  return (
    <div style={{position:'relative'}}>
      <div>{props.children}</div>
      <TabBar
      style={{position:'fixed',width:'100%',bottom:0}}
         activeKey={activityKey}
         onChange={(key) => { navigate(`/${key}`);setActivityKey(key) }}
      >
         {tabs.map(item => (
            <TabBar.Item
               key={item.key}
               icon={item.icon}
               title={item.title}
               badge={item.badge}
            />
         ))}
      </TabBar>
   </div>
  );
}

export default App;
