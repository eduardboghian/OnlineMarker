import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ContactList({ props, contactList, uid }) {
    const [contacts, setContacts] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/get-users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (contactList !== undefined) {
            let res = users.filter(user => contactList.includes(user._id))
            setContacts(res)
        }
    }, [contactList])


    function redirectHandler(e, uid1, uid2) {
        e.preventDefault()
        window.location.href = `/chat/${uid1}/${uid2}`
    }

    return (
        <div>
            {contacts.map((data, i) =>
                <div className="contacts" key={i} onClick={e => redirectHandler(e, uid, data._id)}>{data.username}</div>
            )}
        </div>
    )
}
