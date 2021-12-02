import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BeatLoader } from 'react-spinners';
import { getFirestore } from '@firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
const db = getFirestore();
export default function UserProfile() {
    const id = useParams().id;
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        console.log(id);
        getUser(id);
    }, []);
    async function getUser(uid) {
        const docRef = doc(db, "Users", uid);
        const data = await getDoc(docRef);
        if (data.exists()) {
            setUserData(data.data());
        }
    }
    return (
        <div>
            <Navbar />
            <div className="mainBackground">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card cardshadow text-center">
                            <div style={{ textAlign: 'left' }}>
                                {userData
                                    ? <div>
                                        <p>Contact info: </p>
                                        <img src={userData.photoUrl} />
                                        <p>Name: {userData.displayName}</p>
                                        <p>Email: {userData.email}</p>
                                    </div>
                                    : <BeatLoader color={"#000000"} loading={true} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>

            </div>
        </div >
    );
}