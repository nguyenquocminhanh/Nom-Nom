// utility dùng để update object
// khi hoàn thành xong hết reducer mới hẵn làm utility!!

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// preload immages into cache before rendering
export const cacheImages = async (srcArray) => {
    // làm cách này đảm bảo tất cả hình được load trước khi thay đổi state isLoaded,
    // làm cách onLoad từng image thì không đảm bảo được lỡ tấm này load xong đổi state mà image kia chưa xong thì sao??
    const promises = await srcArray.map(src => {
        // In each iteration, the current image will be processed and loaded into a Promise.
        // It is done in a Promise, so that the LOAD FULLY COMPLETES before jumping to the next image
        return new Promise(function (resolve, reject) {
            const img = new Image();

            img.src = src;
            img.onload = resolve();
            img.onerror = reject();
        });
    });
    // this will happen once we run Promise.all(promises) where ALL OF PROMISES run
    return await Promise.all(promises);
    // load xong hết hình mới setState
    // we have to make sure we do not show the web app until
    // the images have loaded/till the isLoaaded is true by showing Loading component

}


// get current Date, format November 29, 2020

export const getCurrentdate = () => {
    const month = new Date().getMonth();
    let newMonth = '';
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    const hour = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
    const minute = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    const second = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();

    switch (month) {
        case 0:
            newMonth = 'January';
            break;
        case 1:
            newMonth = 'February';
            break;
        case 2:
            newMonth = 'March';
            break;
        case 3:
            newMonth = 'April';
            break;
        case 4:
            newMonth = 'May';
            break;
        case 5:
            newMonth = 'June';
            break;
        case 6:
            newMonth = 'July';
            break;
        case 7:
            newMonth = 'August';
            break;
        case 8: 
            newMonth = 'September';
            break;
        case 9: 
            newMonth = 'October';
            break;
        case 10:
            newMonth = 'November';
            break;
        case 11:
            newMonth = 'December';
            break;
        default: 
    }

    const currentTime = newMonth + ' ' + date + ', ' + year + ', ' + ' ' + hour + ':' + minute + ':' + second;
    return currentTime;
}

// Sorting an array by date 
export const sortByDate = arr => {
    const sorter = (a, b) => {
       return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return arr.sort(sorter);
 };

// change from 2021-10-30 to 10/30/2021
 export const changeDateFormat = date => {
    let year = date.substring(0, 4);
    let month = date.substring(5,7);
    let day = date.substring(8, 10);
    return month + '/' + day + '/' + year; 
}

export const getRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const checkValidity = (value, rules) => {
    // Kết hợp isValid với điều kiện để tránh trường hợp user chưa nhập gì vào input mà
    // valid đã báo false và check tất cả điều kiện chứ ko phải chỉ riêng điều kiện cuối

    let isValid = true;

    if (rules.minLength) {
        // allows empty string
        isValid = value.length >= rules.minLength && isValid || value.length === 0;
    }

    if (rules.maxLength) {
        // allows empty string
        isValid = value.length <= rules.maxLength && isValid || value.length === 0;
    }

    // If validation has required in it
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.validEmail) {
        // allows empty string
        // empty string - required field let .required decide
        isValid = (/^$|^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value) && isValid;
    }

    if (rules.validPhoneNumber) {
        // allows empty string
        isValid = (/^$|^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).test(value) && isValid;
    }

    if(rules.numberOnly) {
        // allows empty string
        isValid = (/^$|^[0-9]+$/).test(value) && isValid;
    }

    if(rules.letterOnly) {
        // allows empty string
        isValid = (/^$|^[A-Za-z]+$/).test(value) && isValid;
    }

    if(rules.letterAndSpaceOnly) {
        // allows empty string
        // Must have at least one letter
        isValid = (/^$|^([\s]*[0-9]*[\s]*[a-zA-Z]+[\s]*[0-9]*[\s]*)+/).test(value) && isValid;
    } 

    if(rules.validDate) {
        isValid = (/[0-9]{4}-[0-9]{2}-[0-9]{2}/).test(value) && isValid;
    }
    return isValid;
}