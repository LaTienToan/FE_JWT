import React, { useEffect, useState } from 'react';
import '../Login/Login.scss'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/userService'
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
    const { loginContext } = React.useContext(UserContext);
    let history = useHistory()
    const [valueLogin, setValueLogin] = useState("")
    const [password, setPassword] = useState("")

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidValuePassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

    const handleCreateNewAcount = () => {
        history.push('/register')
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)

        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false })
            toast.error("Please enter email address or phone number")
            return
        }

        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidValuePassword: false })
            toast.error("Please enter your password")
            return
        }
        let response = await loginUser(valueLogin, password)
        if (response && +response.EC === 0) {
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }
            localStorage.setItem('jwt', token)
            loginContext(data)
            history.push('/users')
            // window.location.reload()
        }
        if (response && +response.EC !== 0) {
            //erroe
            toast.error(response.EM)
        }
        console.log(">>>> check response: ", response.data);
    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    }


    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
                        <div className='branch'>
                            Facebook
                        </div>
                        <div className='detail'>
                            Đăng nhập gần đây
                            Nhấp vào ảnh của bạn hoặc thêm tài khoản.
                        </div>
                    </div>

                    <div className="content-right d-flex flex-column col-sm-5 col-12 gap-3  py-3 ">
                        <div className='branch d-sm-none'>
                            Facebook
                        </div>
                        <input type='text'
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder='Email hoặc số điện thoại'
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input type='password'
                            className={objValidInput.isValidValuePassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder='Mật khẩu'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button type='submit' className="btn btn-primary" onClick={() => handleLogin()}>Đăng nhập</button>
                        <a href='/' className='text-center'>Quên mật khẩu ?</a>
                        <hr />
                        <div className='text-center'>
                            <button type='submit' className="btn btn-success" onClick={() => handleCreateNewAcount()}>Tạo mới tài khoản</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login