import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";
import IconButton from "./icon-button";

const Card = ({ item, cardAction, viewAction, bookmarkAction, shareAction }) => {
  // Declaracion de un valor animado en 0
  let scaleValue = new Animated.Value(0);

  // -- cómo cambiará el valor animado --
  // interpolate: permite actualizar un valor una vez que se inicia la animacion
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],   // Cada uno tiene un valor de matriz que se asigna entre sí
    outputRange: [1, 1.1, 1.2]   // ''
  });
  // -- Asignacion entre valores --
  // 0 → 1 -- outputRange, en este caso hace referencia  al factor de escala del componente. 1 indica que es igual a su tamaño original
  // (porque cualquier número entero que multiplique por 1 siempre será igual a sí mismo)
  // 0.5 → 1.1 -- 1.1 indica que se quiere que cuando el componente llegue a su punto maximo, sea un 20% mas grande
  // 1 → 1.2

  // -- Implementacion de la animacion
  let transformStyle = { ...styles.card, transform: [{ scale: cardScale}] };
  // scale: declaración de transformación CSS para escalar el tamaño de la tarjeta en función del valor actual del valor animado.

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        scaleValue.setValue(0); // Primero, establecemos el valor animado en 0. Esto restablece efectivamente la animación cada vez que el usuario la inicia
        Animated.timing( // permite actualizar el valor animado durante un período específico de tiempo
          scaleValue,  // valor animado
          { // objeto que contiene la configuración a utilizar para la animacion
            toValue: 1,  //actualice el valor animado a 1 a lo largo de 250milisegundos
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
          }
        ).start();

        cardAction();
      }}
      onPressOut={() => { //al liberar el boton se quiere recuperar el valor animado a su valor inicial durante un período específico de tiempo.
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
      }
    }>
      <Animated.View style={transformStyle}>
        <Image source={item.pic} style={styles.thumbnail} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.icons}>
          <IconButton
            icon="search"
            onPress={() => {
              viewAction(item.name, item.full_pic);
            }}
            data={item}
          />
          <IconButton icon="bookmark" onPress={bookmarkAction} data={item} />
          <IconButton icon="share" onPress={shareAction} data={item} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  card: {
    width: 120,
    height: 140,
    backgroundColor: "#fafbfc",
    padding: 10,
    margin: 10,
    alignItems: "center"
  },
  name: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold"
  },
  thumbnail: {
    width: 75,
    height: 75
  },
  icons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

export default Card;
