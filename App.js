import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Header from "./src/components/header";
import CardList from "./src/components/card-list";
import AnimatedModal from "./src/components/animated-modal";
import BigCard from "./src/components/big-card";
import { getRandomInt } from "./src/helpers/get-random-int";
import pokemon from "./src/data/pokemon";
import pokemon_stats from "./src/data/pokemon-stats";


class App extends Component {
  constructor(props) {
    super(props);
    this.pokemon_stats = [];
    this.state = {
      isModalVisible: false
    }
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this.pokemon_stats = [];

    pokemon_stats.forEach((item) => {
      this.pokemon_stats.push({
        label: item,
        value: getRandomInt(25,150)
      });
    })

    this.setState({
      pokemon,
      image,
      stats: this.pokemon_stats,
      isModalVisible: true
    });
  }

  bookmarkAction = () => {};

  shareAction = () => {};

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render(){
    return (
      <View style={styles.container}>
        <Header
          title={"Poke-Gallery"}
        />
        <CardList
          data={pokemon}
          cardAction={this.cardAction}
          viewAction={this.viewAction}
          bookmarkAction={this.bookmarkAction}
          shareAction={this.shareAction}
        />
        <AnimatedModal
          title={'View Pokemon'}
          visible={this.state.isModalVisible}
          onClose={() => {
            this.setState({
              isModalVisible: false
            });
          }}>
          <BigCard
            title={this.state.pokemon}
            image={this.state.image}
            data={this.state.stats}
          />
        </AnimatedModal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
