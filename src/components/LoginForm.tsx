import React, {FC, useState} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/redusers/auth/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActionsAll} from "../hooks/useActions";


const LoginForm: FC = () => {

        const {login} = useActionsAll();       // вызов dispatch

        const {error, isLoading} = useTypedSelector(state => state.auth)

        const [username, setUsername] = useState();
        const [password, setPassword] = useState();

        const onFinish = (values: any) => {
            console.log('Success:', values);
            // Вызываем dispatch login через хук useActions
            // @ts-ignore
            login(username, password);

        };
        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {error &&
            <div style={{color: 'red'}}>
                {error}
            </div>
            }
            <Form.Item
                label="Username"
                name="username"
                rules={[ rules.required("Please input your username!") ]}
            >
                <Input
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[ rules.required("Please input your password!") ]}
            >
                <Input.Password
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;