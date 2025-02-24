import { useNavigate } from "react-router";


export default function Home() {


    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/user/logout", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                navigate("/userAuth");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <h2 className="text-center text-lg/8 font-semibold text-gray-900">
                        User Name
                    </h2>
                    <a
                        href="#"
                        className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-amber-100 shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Edit Profile
                    </a>
                    <a
                        href="#"
                        className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-amber-100 shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </a>

                </div>
            </div>
        </div>
    )
}