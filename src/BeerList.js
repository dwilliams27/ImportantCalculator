import React, { Component } from 'react'

class BeerList extends Component {
  render() {
    return (
      <ol className='contact-list'>
        {
          this.props.beers.map(beer => {
            return (
              <li key={beer.product} className='contact-list-item'>
                <div>{beer.product}</div>
              </li>
            );
          })
        }
      </ol>
    );
  }

}

export default ListContacts