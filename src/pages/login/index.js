import React, { useEffect, useState } from 'react'
import { NavBar, Form, Input, Button, Checkbox } from 'antd-mobile'
import styles from './index.less'
import { useNavigate } from 'react-router-dom'

const Index = (props) => {
   const [ispasswordLogin, setIsPasswordLogin] = useState(true)
   const navigate = useNavigate();
   // useEffect(() => {
   //    let navigate = useNavigate();
   // }, [])
   const toHome = () => {
      navigate('/home');
   }
   const PasLogin = () => {
      return (
         <Form layout='horizontal'>
            <Form.Item label='账号' name='username'>
               <Input placeholder='请输入账号' clearable />
            </Form.Item>
            <Form.Item label='密码' name='password'>
               <Input placeholder='请输入密码' clearable type='password' />
            </Form.Item>
         </Form>
      )
   }
   const PhoLogin = () => {
      return (
         <Form layout='horizontal'>
            <Form.Item
               label='手机号'
               extra={
                  <div className={styles.extraPart}>
                     <a>获取验证码</a>
                  </div>
               }
            >
               <Input placeholder='请输入手机号' clearable />
            </Form.Item>
            <Form.Item label='验证码' name='password'>
               <Input placeholder='请输入验证码' clearable type='password' />
            </Form.Item>
         </Form>
      )
   }
   return (
      <div className={styles.home}>
         <NavBar
            back={null}
            right={<a style={{ color: '#6495ED', fontSize: '0.5rem' }} >开店</a>}
            style={{
               '--border-bottom': '2px #eee solid'
            }}>登录</NavBar>

         <div className={styles.content}>
            <div className={styles.login}>
               <span
                  className={ispasswordLogin ? styles.active : null}
                  onClick={() => setIsPasswordLogin(true)}
               >
                  密码登录
               </span>&nbsp;&nbsp;|&nbsp;&nbsp;
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
                  '--background-color': '	#6495ED',
                  '--text-color': '#fff',
                  width: 'calc(100vw - 40px)',
                  height: 50,
                  margin: '20px 20px 0'
               }}
               onClick={toHome}
            >登录</Button>
            <Button
               style={{
                  width: 'calc(100vw - 40px)',
                  margin: '5px 20px'
               }}
               fill="none"
               size="mini"
            >忘记账号和密码</Button>
            <div className={styles.footer}>
               <Checkbox />&nbsp;
               登录代表您已同意
               <a style={{ color: '#6495ED' }}>《食堂商家隐私政策》</a>
            </div>
         </div>
      </div>)
}
export default Index
