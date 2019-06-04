import React, { Component } from 'react'

class BeerList extends Component {
  static ABVDFilter = () => {
    return (beer) => {
      return {
        ...beer,
        weightValue: parseFloat(beer['Units per 100ml']/parseFloat(beer['Price'])).toFixed(1)
      }
    }
  }

  render() {
    return (
      <ol className='contact-list'>
        {
          this.props.beers.filter((beer, index) => {
            let beerString = `${beer['Description']}, served as ${beer['Quantity']} ${beer['Quantity Units']} for ${beer['Price']} and ABV ${beer['ABV']}%`;
            return (beerString.toLowerCase().includes(this.props.query.toLowerCase()))
            }).map((beer, index) => {
            return (
              <li key={index} className='contact-list-item'>
                <p1>{`${beer['Description']}, served as ${beer['Quantity']} ${beer['Quantity Units']} for ${beer['Price']} and ABV ${beer['Units per 100ml']*10}%`}</p1>
                <h2>{`Score: ${beer['Units per 100ml']/parseFloat(beer['Price'])}`}</h2>
              </li>
            );
          })
        }
      </ol>
    );
  }

}

export default BeerList;