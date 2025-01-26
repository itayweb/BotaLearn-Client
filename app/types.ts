import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { GestureResponderEvent, ImageStyle, StyleProp, TextInputIOSProps, TextStyle, ViewStyle } from "react-native"

export type AuthTextBoxType = {
    placeHolder?: string,
    iconName?: IconProp,
    style?: StyleProp<ViewStyle>,
    type?: TextInputIOSProps["textContentType"],
    onChangeData?: (value: string) => void,
    value?: any
} 

export type CustomButtonType = {
    style?: StyleProp<ViewStyle>,
    text?: string,
    isDisable?: boolean,
    onPress?: (event:React.BaseSyntheticEvent) => void
}

export type SignupType = {
    fullName: string,
    email: string,
    username: string,
    password: string
}

export type BackButtonType = {
    // onPress: ((event: GestureResponderEvent) => void) | undefined,
    onPress?: (event:React.BaseSyntheticEvent) => void,
    style?: StyleProp<ViewStyle>
}

export type SigninType = {
    email: string,
    password: string
}

export interface User {
    fullName: string,
    email: string,
    username: string,
}

export type UserContextType = {
    user: User,
    setUser: (user: User) => void
}