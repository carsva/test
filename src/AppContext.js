import React from 'react';

let plants = [];

if (localStorage.plants) {
  let localPlants = JSON.parse(localStorage.plants);
  plants = localPlants;
}

export const AppContext = React.createContext('plant');

export class AppProvider extends React.Component {
  state = {
    plants: plants,
    anyPlantNeedWater: null,
  };

  WateringDates = () => {
    var dateObjOutside = new Date();
    dateObjOutside = dateObjOutside.toISOString();
    

    let plants = this.state.plants;

    let UpdatedPlants = plants.map(plant => {
      if (dateObjOutside > plant.wateringDate) {
        plant.plantNeedWater = true;
        var dateObj = Date.now();
        dateObj += plant.waterInterval * 86400000;
        dateObj = new Date(dateObj);
        plant.wateringDate = dateObj;
      }
      return plant;
    });
    // console.log(UpdatedPlants)

    this.setState({
      plants: UpdatedPlants,
    });
    localStorage.plants = JSON.stringify(UpdatedPlants);
    // console.log(this.state.plants)
    // console.log(localStorage.plants)

    this.PlantNeedWater();
  };



    onDutyCheck = () => {
        console.log('check')
        this.WateringDates();
    }

    onDuty = () => {
    console.log('starting duty')
    setInterval(this.onDutyCheck, 60000);
    }


  deletePlant = plantname => {
    let plants = this.state.plants;

    let filteredPlants = plants.filter(plant => {
      return plant.name !== plantname;
    });

    this.setState({
      plants: filteredPlants,
    });
    localStorage.plants = JSON.stringify(filteredPlants);
    this.PlantNeedWater();
  };

  newPlant = values => {
    let plants = this.state.plants;

    var dateObj = Date.now();
        dateObj += values.waterInterval * 86400000;
        dateObj = new Date(dateObj);

    dateObj = dateObj.toISOString();
    

    // Add 3 days to the current date & time
    //   I'd suggest using the calculated static value instead of doing inline math
    //   I did it this way to simply show where the number came from
    
    
    // create a new Date object, using the adjusted time
    // dateObj = new Date(dateObj);
    // date

    plants.push({
      name: values.name,
      amount: values.amount,
      waterInterval: values.waterInterval,
      wateringDate: dateObj,
      picture: values.picture,
      plantNeedWater: values.plantNeedWater,
    });

    this.setState({
      plants: plants,
    });
    localStorage.plants = JSON.stringify(plants);
    this.PlantNeedWater();
  };

  AnyPlantNeedWater = value => {
    this.setState({ anyPlantNeedWater: value });
  };

  PlantNeedWater = () => {
    let plants = this.state.plants;
    let thirstyPlants = plants.map(plant => plant.plantNeedWater);
    if (thirstyPlants.includes(true)) {
      this.AnyPlantNeedWater(true);
    } else {
      this.AnyPlantNeedWater(false);
    }
  };

  componentWillMount() {
    this.PlantNeedWater();
    this.WateringDates();
    this.onDuty();
  }

  render() {
    const value = {
      state: {
        ...this.state,
        newPlant: this.newPlant,
        ThirstyToHappy: this.ThirstyToHappy,
        PlantNeedWater: this.PlantNeedWater,
        test: this.test,
        deletePlant: this.deletePlant,
        WateringDates: this.WateringDates,
      },
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
