import React, { useEffect, useState } from 'react';
import { db } from '../services/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getSignedInUser } from '../services/Firebase';
import { BeatLoader } from 'react-spinners';
export default function UserInfo() {
    useEffect(() => {
        getUser();
    }, []);
    const [userData, setUserData] = useState(null);
    async function getUser() {
        var user = getSignedInUser();
        console.log(user);
        console.log(user.uid);
        if (user) {
            const docRef = doc(db, "Users", user.uid);
            const data = await getDoc(docRef);
            if (data.exists()) {
                setUserData(data.data());
            }
        }
    }
    return (
        <div>
            <p>User Data: </p>
            {userData != null
                ? <div>
                    <p>Name: {userData.displayName}</p>
                    <p>Email: {userData.email}</p>
                </div>
                : <BeatLoader color={"#000000"} loading={true} />
            }

        </div>
    );
};;