import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { useHistory} from "react-router-dom";

import {
  hideMessage,
  showAuthLoader,
  userSignIn,
} from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";

const SignIn = () => {

  const dispatch = useDispatch();
  const {loader, alertMessage, showMessage, authUser} = useSelector(({auth}) => auth);
  const history = useHistory();

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      history.push('/');
    }
  });

  const onFinishFailed = errorInfo => {
  };

  const onFinish = values => {
    dispatch(showAuthLoader());
    dispatch(userSignIn(values));
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              
            </div>
            <div className="gx-app-logo">
              <img alt="example" src="/assets/images/logo.png"/>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{remember: true}}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                initialValue="demo@example.com"
                rules={[{required: true, message: 'The input is not valid E-mail!'}]} name="email">
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item
                initialValue="demo#123"
                rules={[{required: true, message: 'Please input your Password!'}]} name="password">
                <Input type="password" placeholder="Password"/>
              </Form.Item>
              <Form.Item>
                <Checkbox checked={true}><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn"/>
                </Button>
               
              </Form.Item>
              
            </Form>
          </div>

          {loader ?
            <div className="gx-loader-view">
              <CircularProgress/>
            </div> : null}
          {showMessage ?
            message.error(alertMessage.toString()) : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
