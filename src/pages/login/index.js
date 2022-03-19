import React from 'react'
import { NavBar, Divider } from 'antd-mobile'
import * as styles from './index.less' 
const Index = () => {
   return (<div>
      <NavBar
         back={null}
         right={<a>开店</a>}
         style={{
            '--border-bottom': '1px #eee solid'
         }}>登录</NavBar>
      <span className={styles.loginMethod}>密码登录</span>|
      <span>验证码登录</span>
      <Divider />
   </div>)
}
export default Index
