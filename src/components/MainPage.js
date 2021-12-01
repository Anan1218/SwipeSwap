import RequestSwipe from './RequestSwipe';
import UserInfo from './UserInfo';
import SearchSwipe from './SearchSwipe';
import logo from '../images/logo.png';
export default function MainPage() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#" style={{ paddingLeft: "10px" }}>Home</a>
                <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                    <ul class="navbar-nav ms-auto flex-nowrap">
                        <li class="nav-item">
                            <a href="#" class="nav-link m-2 menu-item nav-active">Log In</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <RequestSwipe />
            {/* <UserInfo />
            <SearchSwipe /> */}
        </div >
    );
}