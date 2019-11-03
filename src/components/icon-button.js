import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const icon_color = "#586069";
const icon_size = 15;

type Props = {};
export default class IconButton extends Component<Props> {
  constructor(props){
    super(props);
    this.rotateValue = new Animated.Value(0);
  }

  render() {
    const { icon, onPress, data } = this.props;

    // cómo cambiará el valor animado
    let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"] // grados que rotará el valor animado
    });

    // estilos para rotar el componente
    let transformStyle = { transform: [{ rotate: rotation }] };

    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          Animated.timing(
            this.rotateValue,
            {
              toValue: 1,
              duration: 700,
              easing: Easing.linear
            }
          ).start();

          onPress(data);
        }}
        onPressOut={() => {
          Animated.timing(
            this.rotateValue,
            {
              toValue: 0,
              duration: 350,
              easing: Easing.linear
            }
          ).start();

          onPress(data);
        }}
      >
        <Animated.View style={transformStyle}>
          <Icon
            name={icon}
            style={styles.icon}
            size={icon_size}
            color={icon_color}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  icon: {
    paddingLeft: 5,
    paddingRight: 5
  }
};
