import React, { useEffect, useState } from 'react';
import { db } from '../services/Firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getSignedInUser } from '../services/Firebase';
import { BeatLoader } from 'react-spinners';
export default function UserInfo() {
    useEffect(() => {
        getUser();
    }, []);
    const [userData, setUserData] = useState(null);
    const [listings, setListings] = useState(null);
    const [requests, setRequests] = useState(null);
    async function getUser() {
        var user = getSignedInUser();
        console.log(user);
        if (user) {
            const docRef = doc(db, "Users", user.uid);
            const data = await getDoc(docRef);
            if (data.exists()) {
                setUserData(data.data());
                getListingsAndRequests(user.uid);
            }
        }
    }
    async function getListingsAndRequests(uid) {
        const listings = collection(db, "SellSwipe");
        const requests = collection(db, "BuySwipe");
        var l = [];
        var r = [];
        const qL = query(listings, where("userId", "==", uid));
        const qr = query(requests, where("userId", "==", uid));
        const snapshot1 = await getDocs(qL);
        const snapshot2 = await getDocs(qr);
        snapshot1.forEach((doc) => {
            l.push(doc);
        });
        snapshot2.forEach((doc) => {
            r.push(doc);
        });
        setListings(l);
        setRequests(r);
    }
    function UserInfoDisplay(props) {
        return (
            <div>
                <img src={props.userData.photoUrl} />
                <p>Name: {props.userData.displayName}</p>
                <p>Email: {props.userData.email}</p>
                <p>Your Listings: </p>
                {listings ? <p>Has Listings!</p> : <BeatLoader loading={true} />}
                <p>Your Requests: </p>
                {requests ? <p>Has requests!</p> : <BeatLoader loading={true} />}
            </div>
        );
    }
    return (
        <div>
            <p>User Data: </p>
            {userData != null
                ? <UserInfoDisplay userData={userData} />
                : <BeatLoader color={"#000000"} loading={true} />
            }

        </div>
    );
};;