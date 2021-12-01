import RequestSwipe from './RequestSwipe';
import UserInfo from './UserInfo';
import SearchSwipe from './SearchSwipe';

export default function MainPage() {
    return (
        <div>
            <RequestSwipe />
            <UserInfo />
            <SearchSwipe />
        </div>
    );
}