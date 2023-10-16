import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
    const { isLoading, error, loginUpdate, handleLogin, loginInfo } = useContext(AuthContext);
    return (
        <>
            <Form onSubmit={handleLogin}>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Login</h2>
                            <Form.Control type="text" placeholder="Email"
                                onChange={
                                    (e) => {
                                        loginUpdate({ ...loginInfo, email: e.target.value })
                                    }
                                }
                            />
                            <Form.Control type="password" placeholder="Password" autoComplete="false"
                                onChange={
                                    (e) => {
                                        loginUpdate({ ...loginInfo, password: e.target.value })
                                    }
                                }
                            />
                            <Button variant="primary" type="submit">{isLoading ? "Getting you in ...." : "Login"}</Button>
                            {
                                error?.error && (
                                    <Alert variant="danger"><p>{error.message}</p></Alert>)
                            }
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default Login;