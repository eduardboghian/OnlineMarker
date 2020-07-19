import React, { useEffect, useState } from 'react'
import Messages from './Messages/Messages'
import { Link } from 'react-router-dom'
import InfoBar from './InfoBar/InfoBar'
import ContactList from './ContactList'
import Input from './Input/Input'

import '../css/DashboardComp.css'
import io from 'socket.io-client'
import jwt from 'jsonwebtoken'
import axios from 'axios'

let socket

export default function Dashboard(props, location) {
    const [userdata, setUserData] = useState({})
    const [userdata2, setUserData2] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [rooms, setRoom] = useState('')
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const ENDPOINT = ':'

    useEffect(() => {
        setUserData(jwt.verify(localStorage.getItem('token-market'), 'jwtSecret'))

        axios.put(`/api/chat/add-contact/${props.match.params.uid1}/${props.match.params.uid2}`)
            .then(res => {
                if (userdata._id === res.data.user._id) {
                    setUserData(res.data.user)
                    setUserData2(res.data.user2)
                } else {
                    setUserData(res.data.user2)
                    setUserData2(res.data.user)
                }
            })
            .catch(err => console.log(err))

        // CREATE ROOM/ LOAD MESSAGES

        axios.post(`/api/chat/create-room/${props.match.params.uid1}/${props.match.params.uid2}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        axios.get(`/api/chat/load-messages/${props.match.params.uid1}/${props.match.params.uid2}`)
            .then((res) => {
                res.data[0].messages.map((msg) => {
                    setMessages((messages) => ([...messages, msg]))

                    return 0
                })
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        let name = 'You'
        let room = props.match.params.uid1 + props.match.params.uid2

        socket = io(ENDPOINT);

        setRoom(room)
        setUsername(name)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        })

        // let msgs = document.getElementById('messages')
        // msgs.innerHTML = ''

        // messages.map((data)=> {
        //     let messages = document.getElementById('messages')

        //     let message = document.createElement('div')
        //     message.setAttribute('class', 'chat-message')
        //     message.textContent = data.name+': '+data.message

        //     messages.appendChild(message)

        //     return 0
        // })

    }, [ENDPOINT, location.search])

    useEffect(() => {

        socket.on('message', (message) => {
            setMessages([...messages, message])
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    function handleToken(token, adresses) {
        console.log(token)

        axios.post('/checkout', {
            token: token
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="dasboard">
                <Link to='/' className="back-home">Go Back Home</Link>
                <div className="top-bar">
                    <p>User: {userdata2.username}</p>
                </div>

                <div className="contact-list">
                    <ContactList props={props} contactList={userdata.contactList} uid={userdata._id} />
                </div>
                <div className="chat-wr">
                    <div className="chat-screen" id='messages'>
                        <Messages messages={messages} name={username} />
                    </div>
                    <div className='chat-screen-form'>
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </div>

                </div>
            </div>
        </div>
    )
}
