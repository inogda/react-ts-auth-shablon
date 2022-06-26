import React, {FC} from 'react';
import {Layout, Menu, MenuProps, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActionsAll} from "../hooks/useActions";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const {isAuth, user} = useTypedSelector( state => state.auth );

    const {logout} = useActionsAll();       // вызов dispatch

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{color: "white"}}>
                            {user.username}
                        </div>

                        <Menu theme="dark" mode="horizontal" selectable={false} >
                            <Menu.Item
                                key={1}
                                // Вызываем dispatch logout через хук useActions
                                // @ts-ignore
                                onClick={ () => logout() }
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key="mail" onClick={() => navigate(RouteNames.LOGIN)}>
                                Login One
                            </Menu.Item>
                        </Menu>
                    </>
                }


            </Row>
            
        </Layout.Header>
    );
};

export default Navbar;