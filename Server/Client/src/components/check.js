import React, {  useEffect } from 'react';


const Check = () =>{
    useEffect(() => {
        const checkauth = async () => {
            fetch('/protectd', {
                method: 'GET',
                credentials: 'include',
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
        }

        checkauth();
    });
}

export default Check;