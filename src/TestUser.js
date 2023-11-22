import HomeForgotPassword from "./HomePage/HomeForgotPassword"


export default function TestUser(){

    const [user, setUser] = useState([
        {userName:"18-8888-111",
         passWord:"IamAdmin",
         userType:"admin"
        },
        {userName:"16-6666-111",
        passWord:"IamAdmin",
        userType:"student"
        },
        {userName:"15-5555-111",
        passWord:"IamAdmin",
        userType:"employee"
        },
        {userName:"13-3333-1111",
        passWord:"IamSekyu",
        userType:"sekyu"
        },
        ])
    
    return(<>        
        <HomeLogin user={user}/>
    </>)
}