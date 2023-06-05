import '../Register/Register.scss'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../service/userService'

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const defaultValidInput = {
        isvalidEmail: true,
        isvalidPhone: true,
        isvalidPassword: true,
        isvalidConfirmPassword: true,
    }
    const [objCheckValid, setObjCheckInput] = useState(defaultValidInput)


    let history = useHistory()
    const handleLogin = () => {
        history.push('/login')
    }

    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/test-api").then(data => {
        //     console.log(">>>>check data: ", data);
        // })



    }, [])

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            toast.error("Email is require")
            setObjCheckInput({ ...defaultValidInput, isvalidEmail: false })
            return false;
        }


        var regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isvalidEmail: false })
            toast.error("Please enter a valid email address")
            return false;
        }

        if (!phone) {
            toast.error("Phone is require")
            setObjCheckInput({ ...defaultValidInput, isvalidPhone: false })
            return false;
        }

        if (!password) {
            toast.error("Password is require")
            setObjCheckInput({ ...defaultValidInput, isvalidPassword: false })
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Your password is not the same")
            setObjCheckInput({ ...defaultValidInput, isvalidConfirmPassword: false })

        }



        return true;
    }

    const handleRegister = async () => {
        let check = isValidInputs()

        if (check === true) {
            let serverData = await registerNewUser(email, phone, userName, password)
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push("/login")
            } else {
                toast.error(serverData.EM)
            }
        }
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleRegister();
        }
    }

    return (
        <div className="register-container">
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
                        <div className='form-group'>
                            <label>Email: </label>
                            <input type='text' className={objCheckValid.isvalidEmail ? 'form-control' : 'form-control is-invalid'}
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Phone number: </label>
                            <input type='text' className={objCheckValid.isvalidPhone ? 'form-control' : 'form-control is-invalid'}
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>User name: </label>
                            <input type='text' className='form-control'
                                value={userName} onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password: </label>
                            <input type='password' className={objCheckValid.isvalidPassword ? 'form-control' : 'form-control is-invalid'}
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Re-enter Password: </label>
                            <input type='password' className={objCheckValid.isvalidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                        </div>

                        <button type='button' className="btn btn-primary" onClick={() => handleRegister()}>Đăng kí</button>
                        <a href='/' className='text-center'>Aready've an account. Login</a>
                        <hr />
                        <div className='text-center'>
                            <button type='submit' className="btn btn-success" onClick={() => handleLogin()}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register