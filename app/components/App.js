import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLocations, fetchJourneys } from '../actions';
import StartJourneyPage from './startJourney';
import EndJourneyPage from './endJourney';

class Container extends Component {
  static get defaultProps() {
    return {
      journeys: [],
      locations: [],
    };
  }

  static get propTypes() {
    return {
      journeys: PropTypes.arrayOf(
        PropTypes.shape({
          origin_id: PropTypes.number,
        })),
      locations: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })),
      fetchLocations: PropTypes.func.isRequired,
      fetchJourneys: PropTypes.func.isRequired,
    };
  }

  componentWillMount() {
    this.props.fetchLocations();
    this.props.fetchJourneys();
  }

  render() {
    const { journeys, locations } = this.props;
    const ongoingJourneys = journeys.filter(journey => !journey.destination);

    console.warn('journeys', journeys);
    console.warn('locations', locations);

    return (
      <View>
        {ongoingJourneys.length ?
          (<EndJourneyPage locations={locations} journey={ongoingJourneys[0]} />) :
          (<StartJourneyPage {...this.props} />)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  journeys: state.journeys,
});

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => {
    dispatch(fetchLocations());
  },
  fetchJourneys: () => {
    dispatch(fetchJourneys());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);