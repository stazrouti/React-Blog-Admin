import SideBar from "./SideBar";
import Nav from "./Nav";
function AdminLayout({ Content ,children }){
    return (
        <div>
            <Nav/>
            <div className="flex">
                {/* this for the side bar on the left */}
                {/* <div className="w-1/5 "  style={{height: '87vh'}}> */}
                <div className="w-1/5 h-screen">
                    <SideBar />
                </div>
                {/* this is for the content that will be updated with link */}
                    
                <div>
                    <main className="w-100 overflow-x-hidden overflow-y-auto ">
                        {Content || children}
                    </main>
                </div>
            </div>
        </div>
    );
}
export default AdminLayout;