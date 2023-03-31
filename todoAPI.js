class ContactApi{
    static API = 'https://6425946c9e0a30d92b361db3.mockapi.io/API/todoAPI'

    static getList(){
        return fetch(ContactApi.API)
        .then((response) => {
            if(response.ok) return response.json()
            throw new Error("Can't load data from server!")
        })
    }
    static create(contact) {
        return fetch(ContactApi.API, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
              'Content-type': 'application/json',
            }
        })
        .then((response) => {
            if (response.ok) return response.json()
            throw new Error("Can't create contact on server!");
        })
    }
    
    static delete(id) {
        return fetch(ContactApi.API + `/${id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) return response.json()
            throw new Error("Can't delete contact from server!");
        })
    }
}
