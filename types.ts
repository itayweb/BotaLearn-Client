import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { ImageStyle, StyleProp, TextInputIOSProps, TextStyle, ViewStyle } from "react-native"

export type AuthTextBoxType = {
    placeHolder: string,
    iconName: IconProp,
    style?: StyleProp<ViewStyle>,
    type: TextInputIOSProps["textContentType"],
    onChangeData: (value: string) => void
} 

export type CustomButtonType = {
    style?: StyleProp<ViewStyle>,
    text: string,
    isDisable: boolean
}