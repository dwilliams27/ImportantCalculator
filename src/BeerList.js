import React, { Component } from 'react'

class BeerList extends Component {
  static ABVDFilter = () => {
    return (beer) => {
      return {
        ...beer,
        weightValue: (beer['Units per 100ml']/parseFloat(beer['Price']))
      }
    }
  }

  render() {
    return (
      <ol className='contact-list'>
        {
          this.props.beers.map((beer, index) => {
            return (
              <li key={index} className='contact-list-item'>
                <p1>{`${beer['Description']}, served as ${beer['Quantity']} ${beer['Quantity Units']} for ${beer['Price']} and ABV ${beer['ABV']}%`}</p1>
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