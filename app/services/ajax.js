import Service from '@ember/service';

export default Service.extend({
    makeNetworkCall(url, method, headers, payload) {
        return new Promise((resolve, reject)=>{
            fetch(url, {
                method,
                credentials: 'include',
                headers,
                body: payload
            })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // if(!data['isSuccess']){
                //     reject(data)
                // }
                // else{
                //     resolve(data)
                // }
                resolve(data);
            })
            .catch(error => {
                reject(error)
            })
        })
    }
});
