import React, { useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import  { auth } from '../firebase';


import { AuthProvider, useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    
    const history = useHistory();
    const { user } = useAuth();

    console.log(user);

    const[loading, setLoading] = useState(true);
    const handleLogout = async() => {
        await auth.signOut();

        history.push('/')
    }


    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'});
    } 
    useEffect(() => {
        if(!user){
            history.push('/')

            return;
        }
        axios.get('https://AuthProvider.chatengine.io/users/me', {
        headers: {
            "project-id" :"47818c66-519f-4b64-809b-3c42719e3c43",
            "user-name": user.email,
            "user-secret": user.uid

        }
        })
        .then(() => {
            setLoading(false);

        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.displayname)
            formdata.append('secret', user.uid)

            getFile(user.photoUrl, formdata)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)
                })


        })
    }, [user, history])

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Messenger
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine

                height="calc(100vh - 66h)"
                projectId="47818c66-519f-4b64-809b-3c42719e3c43"
                userName="."
                userSecret="."
                />


        </div>
        
    )
}


export default Chats;