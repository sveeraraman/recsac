import React from "react";
import { View, StyleSheet } from "react-native";
import { DefaultText } from "../components/DefaultText";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FavoritesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <DefaultText>Coming soon!</DefaultText>
    </View>
  );
};

FavoritesScreen.navigationOptions = (navdata) => {
  return {
    headerTitle: "Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          icontype="material"
          title="Menu"
          iconName="menu"
          onPress={() => {
            navdata.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
