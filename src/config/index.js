const isRealTest = false
const isReal = typeof window !== "undefined" && window.location.href.indexOf("janapost") >= 0
const isTest = typeof window !== "undefined" && window.location.href.indexOf("janatest") >= 0

function getBaseUrl() {
    if (isReal) {
        return "https://admin-api.janapost.kz/"
    } else if (isTest) {
        return "https://api-dev.janatest.kz/"
    } else if (isRealTest) {
        return "https://admin-api.janapost.kz/"
    }
    return "https://api-dev.janatest.kz/"
}

const baseUrl = {
    nakedBaseURL: getBaseUrl(),
    baseURL: getBaseUrl() + "service/",
}

export default baseUrl
