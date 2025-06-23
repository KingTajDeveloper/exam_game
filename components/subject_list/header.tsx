import React, { FC } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface headerProps {
  headerHeight: number;
  scrollY: SharedValue<number>;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  filterText: string;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Header: FC<headerProps> = ({
  headerHeight,
  scrollY,
  filterText,
  setFilterText,
}) => {
  const halfHeaderHeight = headerHeight / 2;

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, headerHeight],
      [headerHeight, halfHeaderHeight],
      Extrapolation.CLAMP
    ),
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, halfHeaderHeight],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const height = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, halfHeaderHeight],
      [halfHeaderHeight, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View
      className="bg-primary rounded-b-2xl overflow-hidden"
      style={[styles.header, headerStyle]}
    >
      <Animated.View
        className="w-full px-2 overflow-hidden flex-row justify-center text-center"
        style={[{ height: halfHeaderHeight }, height]}
      >
        <Animated.Text
          style={[opacity]}
          className="self-center text-white text-2xl font-bold"
        >
          لست مضامین
        </Animated.Text>
      </Animated.View>
      <Animated.View
        className="w-full px-2 flex-row justify-center items-center text-center"
        style={[{ height: halfHeaderHeight }]}
      >
        <AnimatedTextInput
          placeholder={"جستجو مضامین"}
          value={filterText}
          onChangeText={setFilterText}
          placeholderTextColor={"#fff"}
          className={
            "border border-white w-full text-white rounded-full px-3 py-2"
          }
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1,
  },
});
