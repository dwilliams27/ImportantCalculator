import React, { Component } from 'react';
import ABVS from './datasets/abvs.json';
import PRICES from './datasets/prices.json';
import MERGED from './datasets/mergedDataset1_70.json';
import BeerList from './BeerList.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingList: MERGED
    }
  }

  buildFilter = (func) => {
    return (beer) => {
      let newBeer = beer;
      delete newBeer.weightValue;
      newBeer.weightValue = func(beer);
      return newBeer;
    }
  }

  applyFilter = (filter) => {
    let weightedList = [];
    for(let beer of this.state.workingList) {
      weightedList.push(filter(beer));
    }
    console.log(weightedList);
    weightedList.sort(function(a, b) {
      if(a.weightValue < b.weightValue) {
        return -1;
      } else if(a.weightValue > b.weightValue) {
        return 1;
      }
      return 0;
    })
    console.log(weightedList);
    this.setState({
      workingList: weightedList
    })
  }

  resetFilter = () => {
    this.setState({
      workingList: this.AVBS
    })
  }

  mergeDatasets = () => {
    let merged = [];
    let workingPList = PRICES.slice(0);
    ABVS.forEach((abv, index) => {
      let mostConfident = {};
      let best = 0;
      for(let price = 0; price < workingPList.length; price += 1) {
        let words = abv.Product.toString().split(" ");
        let count = 0;
        for(let word in words) {
          if(workingPList[price].Description.toLowerCase().includes(words[word].toLowerCase())) {
            count++;
          }
        }
        let confidence = count/words.length + 0.000001/words.length;
        if(confidence > best) {
          mostConfident = {
            ...workingPList[price],
            ...abv
          }
          best = confidence;
        }
      }
      if(best > 0.7) {
        merged.push(mostConfident);
      }
    })
    console.log(JSON.stringify(merged));
  }

  doABVDFilter = () => {
    this.applyFilter(this.buildFilter(BeerList.ABVDFilter()));
  }

  render() {
    return (
      <div>
        <button onClick={this.doABVDFilter}>DO ABV FILTER</button>
        <BeerList buildFilter={this.buildFilter} applyFilter={this.applyFilter} beers={this.state.workingList}/>
        <button disabled={true} onClick={this.mergeDatasets}>MERGE DATASETS</button>
      </div>);
  }
}

export default App;
