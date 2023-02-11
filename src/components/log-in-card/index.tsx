import { Button, Checkbox, Form, Input } from 'antd';
import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
export const LoginCard = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>登录或注册</div>
      <div className={styles.content}>
        <div className={styles.title}>小站教育欢迎您</div>
        <Form
          name='basic'
          className={styles.form}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input className={styles.input} placeholder={'用户名/邮箱'} />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password className={styles.input} placeholder={'输入密码'} />
          </Form.Item>

          <Form.Item name='passwordComfirm' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password className={styles.input} placeholder={'再次输入密码'} />
          </Form.Item>

          <Form.Item name='email' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input className={styles.input} placeholder={'邮箱地址'} />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.submitButton}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.text}>
          已经注册？<a href='www.baidu.com'>去登录</a>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
