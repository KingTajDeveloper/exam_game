import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { View } from "react-native";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View className="flex-row w-full absolute bottom-0 bg-white p-2 rounded-t-3xl justify-around px-4 items-center">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //     ? options.title
        //     : route.name;
        const IconComponent = options.tabBarIcon ?? (() => null);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            // style={{ flex: 1 }}
            className="text-center justify-center items-center"
          >
            <IconComponent focused={isFocused} />
          </PlatformPressable>
        );
      })}
    </View>
  );
}
