export function getCookie(name) {
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].includes(name)) {
                return cookies[i].split('=')[1]
            }
        }
    }
    return null
}

export function checkObject(object) {
    if (object) {
        if (Object.keys(object).length !== 0) {
            return true;
        }
        return false;
    }
    return false;
}

export  function str2bool(value) {
   if (value && typeof value === 'string') {
     if (value.toLowerCase() === "true") return true;
     if (value.toLowerCase() === "false") return false;
   }
   return value;
}

export function validateEmail(email) {
  let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}
