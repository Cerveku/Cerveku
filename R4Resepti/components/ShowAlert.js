import { Alert } from 'react-native'

//Displays the notification with the desired title and message
export default function ShowAlert (title, message) {
        Alert.alert(
            title,
            message,
            [{text: "OK"}]
        )
}