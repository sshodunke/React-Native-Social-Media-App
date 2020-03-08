import AsyncStorage from '@react-native-community/async-storage'

// header settings
export const options = {
    headers: {
        'X-Authorization': '',
    }
};

export async function getToken(item) {
    try {
        const value = await AsyncStorage.getItem(item);
        options.headers["X-Authorization"] = value
        //return value
    } catch(error) {
        console.log(error)
    }
}

export async function returnToken(item) {
    try {
        const value = await AsyncStorage.getItem(item);
        //options.headers["X-Authorization"] = value
        return value
    } catch(error) {
        console.log(error)
    }
}

export async function clearAsyncStorage() {
    AsyncStorage.clear();
}