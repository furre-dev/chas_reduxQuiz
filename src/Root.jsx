import { Outlet } from "react-router"
import { Link } from "react-router-dom"

export default function Root() {
    return (
        <>
            <div className="pt-3 w-full flex justify-center items-center gap-10">
                <Link to={"/"}><p>Home</p></Link>
                <Link to={"/admin"}><p>Admin</p></Link>
            </div>
            <Outlet />
        </>
    )
}