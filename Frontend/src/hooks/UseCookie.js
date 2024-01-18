import Cookies from 'js-cookie'
import React, { useState, useCallback } from 'react'

export default function UseCookie(cookieName, initialValue) {
    const [value, setValue] = useState(() => {
        const cookie = Cookies.get(cookieName);
        
        if (cookie !== undefined) {
            // If the cookie exists, return its value
            return cookie;
        } else {
            // If the cookie doesn't exist, set it to the initial value
            Cookies.set(cookieName, initialValue);
            return initialValue;
        }
    })
    
    const updateCookie = useCallback(
        (newCookieValue, options) => {
            Cookies.set(cookieName, newCookieValue, options)
            setValue(newCookieValue)
        },
        [cookieName]
    )

    const deleteCookie = useCallback(() => {
        Cookies.remove(cookieName)
        setValue(null)
    }, [cookieName])
    
    return [value, updateCookie, deleteCookie]
}
