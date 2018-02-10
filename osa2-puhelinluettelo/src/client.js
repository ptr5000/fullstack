
import axios from 'axios'

const baseUrl = '/api/persons'

const getPhonebook = () => {
    return axios.get(baseUrl)
}

const sendContact = (contact) => {
    return axios.post(baseUrl, contact)
}

const deleteContact = (id) => {
    return axios.delete(baseUrl + '/' + id)
}

export default {getPhonebook, sendContact, deleteContact}