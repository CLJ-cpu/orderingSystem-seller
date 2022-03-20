import React, { useEffect, useState } from 'react'
import { NavBar, Divider } from 'antd-mobile'
import styles from './index.less'
const Index = () => {
   const [passwordLogin, setPasswordLogin] = useState(true)
   useEffect(() => {

   }, [])
   return (<div className={styles.home}>
      <NavBar
         back={null}
         right={<a style={{color:'orange',fontSize:'16px'}} >开店</a>}
         style={{
            '--border-bottom': '1px #eee solid'
         }}>登录</NavBar>
      <div className={styles.login}>
         <span
            className={passwordLogin ? styles.active : null}
            onClick={() => setPasswordLogin(true)}
         >
            密码登录
         </span>&nbsp;&nbsp;|&nbsp;&nbsp;
         <span
            className={passwordLogin ? null : styles.active}
            onClick={() => setPasswordLogin(false)}
         >
            验证码登录
         </span>
      </div>
      <Divider />
      <div className={styles.content}>
         {passwordLogin&&1}
      </div>
   </div>)
}
export default Index
