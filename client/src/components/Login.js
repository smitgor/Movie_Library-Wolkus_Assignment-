import React, {useState} from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = ({ setLoginUser}) => {

    const navigate = useNavigate();
    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        console.log(user)
        axios.post("/login", user)
        .then(res => {
            setLoginUser(res.data.user)
            navigate("/")
        })

    }


    return (
        <div class="">

        <section class="h-screen">
            <div class="px-6 h-full text-gray-800">
                <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div class="sm:w-2/3 md:w-3/5 lg:w-1/3 m-auto border p-5 mt-32">
                    <h1 class="font-bold text-lg pb-4"> Login To Movie Library</h1>
                        <div class="mb-6">
                            <input
                                type="text"
                                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="email" 
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                            />
                        </div>

                        <div class="mb-6">
                            <input
                            type="password"
                            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="password"
                            value={user.password} 
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            />
                        </div>

                        <div class="text-center lg:text-left">
                            <button
                            type="button"
                            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={login}
                            >
                            Login
                            </button>
                            
                            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                            Don't have an account?
                            <div
                                onClick={() => navigate("/register")}
                                class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out cursor-pointer"
                                >Register</div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Login