import RequestSwipe from './RequestSwipe';
import UserInfo from './UserInfo';
import SearchSwipe from './SearchSwipe';
import Navbar from './Navbar';
export default function MainPage() {
    return (
        <div>
            <Navbar />
            <RequestSwipe />
            {/* <UserInfo />
            <SearchSwipe /> */}
        </div >
    );
}