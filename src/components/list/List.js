import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../Loading';
import Card from '../list/Card';
import responseExample from '../../responseExample.json';
import './List.css';


class List extends React.Component {
    

     render() {
        const { loading, error, dates, location } = this.props;

        // render only loading component, if loading state is set to true
        if (loading) {
            return <div className="loading-container"><Loading/></div>
        }
        // render only error message, if error occured while fething data
        if (error) {
            return <div className="error">{this.state.error}</div>
        }

        return (
            <div>
                {/* <h1>Текущая погода в Вашем регионе </h1> */}
                <h1>Текущая погода в Вашем регионе ({location})</h1>
                <div className="blocksWrap">
                {
                    //console.log(this.state.dates)
                    Object
                    .keys(dates)
                    .map(key => <Card key={key} index={key} details={dates[key]}/>)
                }
                </div>
                
            </div>
            
        );
    }
}

export default List;