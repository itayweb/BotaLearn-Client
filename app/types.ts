import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { ReactElement, Ref } from "react"
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
    ts: EpochTimeStamp,
    is_finished: boolean,
}

export interface IPlantAction {
    id: string,
    stage: string,
    is_finished: boolean,
    start_ts: EpochTimeStamp,
    end_ts: EpochTimeStamp,
}

export interface IPlant {
    plant_id: string,
    name: string,
    min_humidity: number,
    max_humidity: number,
    min_light_exposure: number,
    max_light_exposure: number,
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
    setUser: (user: IUser) => void,
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    login: (userData: IUser) => void,
    logout: () => void,
    loading: boolean
}

export type PlantType = {
    plant: IPlant
}

export interface IAvailablePlant {
    pid: string,
    name: string,
    min_humidity: number,
    max_humidity: number,
    min_light_exposure: number,
    max_light_exposure: number,
    min_temp: number,
    max_temp: number,
    image: string
}

export type AvailablePlantType = {
    plant: IAvailablePlant,
    onPress: (event:React.BaseSyntheticEvent) => void,
    displayMode: 'list' | 'grid'
}

export type BottomSheetType = {
    bottomSheetRef: React.MutableRefObject<BottomSheetModal>
    placeholder?: string,
    style?: StyleProp<ViewStyle>,
    defaultValue?: string,
    onChangeData?: (value: string) => void,
    value?: string
}

export type UserPlantType = {
    plant_id: string,
    planting_position: {
        lat: number,
        lng: number
    }
}