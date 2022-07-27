//из-за CORS политики картинка не читается без прокси
export const ProxyImageUrl = (img:string | null) => {
    const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url='
    return  googleProxyURL + encodeURIComponent(img as string)
}