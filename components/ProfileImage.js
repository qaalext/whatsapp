import React from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import userImage from "../assets/images/userImage.jpeg";
import colors from "../constants/colors";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../utils/ImagePickerHelper";
import { useState } from "react";
import { updateSignedInUserData } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { updateLoggedInInUserData } from "../store/authSlice";

const ProfileImage = (props) => {
  const dispatch = useDispatch();

  const source = props.uri ? { uri: props.uri } : userImage;

  const [image, setImage] = useState(source);

  const [isloading, setIsLoading] = useState(false);

  const showEditButton = props.showEditButton && props.showEditButton === true;

  const userId = props.userId;

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;

      //upload the image
      setIsLoading(true);

      const uploadUrl = await uploadImageAsync(tempUri);

      setIsLoading(false);

      if (!uploadUrl) {
        throw new Error("Could not upload the image");
      }

      const newData = { profilePicture: uploadUrl };
      await updateSignedInUserData(userId, newData);
      dispatch(updateLoggedInInUserData({ newData: newData }));

      // set the image
      setImage({ uri: uploadUrl });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const Container = showEditButton ? TouchableOpacity : View

  return (
    <Container onPress={pickImage}>
      {isloading ? (
        <View height={props.size} width={props.size}>
          <ActivityIndicator size={"small"} color={colors.primary} style={styles.loadingContainer}/>
        </View>
      ) : (
        <Image
          style={{
            ...styles.image,
            ...{ width: props.size, height: props.size },
          }}
          source={image}
        />
      )}
      {
          showEditButton && !isloading && 
          <View style={styles.editIconContainer}>
            <FontAwesome name="pencil" size={15} color="black" />
          </View>

      }
      
    </Container>
  );
};
const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  editIconContainer: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer : {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProfileImage;
