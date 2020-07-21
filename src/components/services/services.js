export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
    }) .catch(() => {
            return Promise.reject({code: 'network-error'});
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject({code: 'LOGIN_INVALID' });
            }
            return response.json();
        });
};
export const fetchUserName = ({username}) => {
  return fetch('/loginUser', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({username}),
  })
      .catch( err => {
        return Promise.reject({ code: 'INVALID'});
      }).then(response => {
        if( response.ok ) {
          return Promise.resolve(response);
        }
        return Promise.reject({ err: 'server-error', details: response.statusCode });
      });
};

export const getChatMessages = ((username) => {
  return fetch('/getMessages/' + username)
      .catch( err => {
        return Promise.reject({ err: 'network-issue', details: err });
      }).then( response => {
        if( response.ok ) {
          return response.json();
        }
        return Promise.reject({ err: 'server-error', details: response.statusCode });
      });
});

export const getUsersList = ((username) => {
    return fetch('/getUsersList/' + username)
        .catch( err => {
            return Promise.reject({ err: 'network-issue', details: err });
        }).then( response => {
            if( response.ok ) {
                return response.json();
            }
            return Promise.reject({ err: 'server-error', details: response.statusCode });
        });
});
export const sendChatMessage = ({user, message}) => {
  return fetch('/sendMessages/' + user, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({message}),
  })
      .catch( err => {
        return Promise.reject({ err: 'network-issue', details: err });
      })
      .then( response => {
        if( response.ok ) {
          return Promise.resolve(response);
        }
        return Promise.reject({ err: 'server-error', details: response.statusCode });
      });
};

export const performLogout = (username, setIsLoggedin) => {
    return fetch('/logout', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body:JSON.stringify({username})
    }).catch(err => {
        return Promise.reject({ err: 'network-issue', details: err});
    }).then(function(response){
        if(response.ok){
            setIsLoggedin(false);
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    })
};