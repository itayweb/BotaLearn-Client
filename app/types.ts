import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { ReactElement } from "react"
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
    onPress?: (event: React.BaseSyntheticEvent) => void,
    icon?: ReactElement<any, any>
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

export interface IPlantReminder {
    id: string,
    date: Date,
    isFinished: boolean,
}

export interface IPlantAction {
    id: string,
    stage: string,
    isFinished: boolean,
    startTS: Date,
    endTS: Date,
}

export interface IPlant {
    id: string,
    name: string,
    type: string,
    humidity: number,
    season: string,
    lightExposure: number,
    placement: string,
    reminders: IPlantReminder[],
    actions: IPlantAction[]
}

export interface IUser {
    fullname: string,
    email: string,
    username: string,
    plants: IPlant[]
}

export type UserContextType = {
    user: IUser,
    setUser: (user: IUser) => void
}

export type PlantType = {
    plant: IPlant
}