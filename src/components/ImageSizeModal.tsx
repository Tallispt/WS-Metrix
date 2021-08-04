import React from 'react';
import { Button, Text, View } from 'react-native';
import MiniModal from 'react-native-modal';

function ImageSizeModal(isModalSliderVisible, setModalSliderVisible) {

    const toggleModal = () => {
        setModalSliderVisible(!isModalSliderVisible);
    };

    return (
        <MiniModal isVisible={isModalSliderVisible}>
            <View style={{ flex: 1 }}>
                <Text>Hello!</Text>

                <Button title="Hide modal" onPress={toggleModal} />
            </View>
        </MiniModal>
    );
}

export default ImageSizeModal;