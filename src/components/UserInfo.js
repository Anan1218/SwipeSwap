import React, { useEffect, useState } from 'react';
import { db } from '../services/Firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getSignedInUser } from '../services/Firebase';
import { BeatLoader } from 'react-spinners';
import Navbar from './Navbar';
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
        const requests = collection(db, "TakenSwipes");
        var l = [];
        var r = [];
        const qL = query(listings, where("userId", "==", uid));
        const qr = query(requests, where("userId", "==", uid));
        const snapshot1 = await getDocs(qL);
        const snapshot2 = await getDocs(qr);
        snapshot1.forEach((doc) => {
            l.push(doc.data());
        });
        snapshot2.forEach((doc) => {
            r.push(doc.data());
        });
        setListings(l);
        setRequests(r);
    }
    function UserInfoDisplay(props) {
        console.log("Lists");
        console.log(listings);
        console.log(requests);
        return (
            <div>
                <img src={props.userData.photoUrl} />
                <p>Name: {props.userData.displayName}</p>
                <p>Email: {props.userData.email}</p>
                <p>Your Listings: </p>
                {listings ? <SwipeList swipes={listings} /> : <BeatLoader loading={true} />}
                <p>Your Purchases: </p>
                {requests ? <SwipeList swipes={requests} /> : <BeatLoader loading={true} />}
            </div>
        );
    }
    function SwipeList(props) {
        const swipes = props.swipes;
        return (
            <div>
                {swipes.map((swipe, i) => (
                    <div key={i}>
                        <div class="card" style={{ height: "100px" }}>
                            <div class="card-body">
                                <h5 class="card-title">Dining Hall: {swipe.diningHallLocation}</h5>
                                <p class="card-text">Meal Period: {swipe.mealPeriod}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
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
                                {userData != null
                                    ? <UserInfoDisplay userData={userData} />
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
};;