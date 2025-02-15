import { View, Text } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { runOnUI } from 'react-native-reanimated';
import { BottomSheetModal, useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { Colors, TextField } from 'react-native-ui-lib';
import { BottomSheetType } from '../app/types';

const BottomSheetInput: React.FC<BottomSheetType> = ({
    bottomSheetRef,
    placeholder,
    style,
    defaultValue,
    onChangeData,
    value
}) => {

    // const bottomSheetRef = useRef<BottomSheetModal>(null);

    const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
    
    const handleOnFocus = useCallback(() => {
        runOnUI(() => {
            shouldHandleKeyboardEvents.value = true;
        })();
    }, [shouldHandleKeyboardEvents]);

    const handleOnBlur = useCallback(() => {
        runOnUI(() => {
            shouldHandleKeyboardEvents.value = false;
        })();

        bottomSheetRef.current?.snapToIndex(1);
    }, [shouldHandleKeyboardEvents]);

    return (
        <TextField placeholder={placeholder} floatingPlaceholder={true} fieldStyle={{}} color="white" floatOnFocus={true} onFocus={handleOnFocus} onBlur={handleOnBlur} containerStyle={{ margin: 10, padding: 5 }} preset={"underline"} floatingPlaceholderColor={{ default: 'grey', focus: "#96d36f" }} hint={`Default: ${defaultValue}`} showClearButton={true} validationMessageStyle={{ display: 'none' }} onChangeText={onChangeData} value={value} />
    )
}

export default BottomSheetInput